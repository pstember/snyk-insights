import '@babel/polyfill';
import 'mutationobserver-shim';
import Vue from 'vue';
import Vuex from 'vuex'
import store from './store'
import './plugins/bootstrap-vue';
import HighchartsVue from 'highcharts-vue';
import App from './App.vue';
import SnykAPI from './utils/http-client-snyk';
import { ListIssuesRequest } from './utils/apiTypes';
import { Vulnerability, Severity } from './utils/types';

const apiClient: SnykAPI = SnykAPI.getInstance();

const reqBody: ListIssuesRequest = { filters: { orgs: [process.env.VUE_APP_ORG] } };

const vulns: Vulnerability[] = [];
const severities = {h:0, m:0, l:0};

const res = apiClient.listIssues(reqBody).then( (res) => {  

  for (const i of res.results) {
    vulns.push(i.issue);
  }
  //debugger;
});

const countIssue = apiClient.countIssues(reqBody).then( (res) => {  

  severities.h = res.results[0].severity.high;
  severities.m = res.results[0].severity.medium;
  severities.l = res.results[0].severity.low;
  //debugger;
});

Vue.config.productionTip = false;
Vue.use(HighchartsVue);
Vue.use(Vuex);

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');

Promise.all([res]).then( () => {
  store.commit('change', vulns.length);
  store.dispatch('process', {
    high: severities.h,
    medium: severities.m,
    low: severities.l,    
    // low: vulns.filter( (x) => x.severity === 'low' ).length,    
    // let chart = this.$refs.highcharts.chart.chart.redraw();
  })
  // debugger;
})


