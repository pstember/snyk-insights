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

const res = apiClient.listAllIssues(reqBody).then( (responseArr) => {  

  for( const res of responseArr) {
    for (const i of res.data.results) {
      vulns.push(i.issue);
    }
    console.log('one request is treated')
  }
  // debugger;
});

const countIssue = apiClient.countIssues(reqBody).then( (res) => {

  severities.h = res.data.results[0].severity.high;
  severities.m = res.data.results[0].severity.medium;
  severities.l = res.data.results[0].severity.low;
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
  // exclude docker
  const v = vulns.filter( (x) => x.language != 'linux');
  store.commit('change', v.length);
  store.dispatch('process', {
    critical: v.filter( (x) => +x.cvssScore >= 9.0 ).length,
    high: v.filter( (x) => +x.cvssScore < 9.0 && +x.cvssScore >= 7.0 ).length,
    medium: v.filter( (x) => +x.cvssScore < 7.0 && +x.cvssScore >= 4.0 ).length,
    // low: severities.l,    
    low: v.filter( (x) => +x.cvssScore < 4.0 && +x.cvssScore > 0.0 ).length, 
    none: v.filter( (x) => +x.cvssScore == 0.0 ).length,
    // let chart = this.$refs.highcharts.chart.chart.redraw();
  })
  // debugger;
})


