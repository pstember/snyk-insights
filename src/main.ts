import '@babel/polyfill';
import 'mutationobserver-shim';
import Vue from 'vue';
import Vuex from 'vuex'
import store from './store'
import App from './App.vue';
// Snyk API import
import SnykAPI from './utils/http-client-snyk';
import { APIFiltersBodyRequest, APIHeaderRequest } from './utils/apiTypes';
import { Vulnerability, Severity } from './utils/types';
// Front-end import
import './plugins/bootstrap-vue';
// LightBootstrap plugin
import LightBootstrap from './light-bootstrap-main'
// Graph lib
import HighchartsVue from 'highcharts-vue';

// Generate the frontend
Vue.config.productionTip = false;
Vue.use(HighchartsVue);
Vue.use(Vuex);
Vue.use(LightBootstrap)

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');

// Start to do some work
const apiClient: SnykAPI = SnykAPI.getInstance();

// Open-source data fetching
// Define header for counting vulns
const reqBody: APIFiltersBodyRequest = { 
  filters: { 
    orgs: [process.env.VUE_APP_ORG],
    languages: ['javascript', 'ruby', 'java', 'scala', 'python', 'golang', 'php', 'dotnet', 'swift'],
}};

// fetch vuln and store them in memory
const vulns: Vulnerability[] = [];
apiClient.listAllIssues(reqBody).then( (responseArr) => {  
  for( const res of responseArr) {
    for (const i of res.data.results) {
      vulns.push(i.issue);
    }
  }

  const v = vulns;
  const overview = {
    critical: v.filter( (x) => +x.cvssScore >= 9.0 ).length,
    high: v.filter( (x) => +x.cvssScore < 9.0 && +x.cvssScore >= 7.0 ).length,
    medium: v.filter( (x) => +x.cvssScore < 7.0 && +x.cvssScore >= 4.0 ).length,
    // low: severities.l,    
    low: v.filter( (x) => +x.cvssScore < 4.0 && +x.cvssScore > 0.0 ).length, 
    none: v.filter( (x) => +x.cvssScore == 0.0 ).length,
  }
  
  // updating store for dynamic rendering
  store.dispatch('process', {
    overview: overview
  });
});

const licenses = [];
const params: APIHeaderRequest = {
  org: process.env.VUE_APP_ORG,
}
apiClient.listLicenses(params,reqBody).then( (response) => {
  const res = response.data.results;
  for( const lic of res){
    licenses.push({
      name: lic.id,
      y: lic.dependencies.length,
    })
  }
  store.commit('updateLicense', licenses);
});


// If I need something done when ALL the request have been processed
// For example, display all data loaded or whatever. left here for later
// Promise.all([<list all requests here>]).then( () => {
//     // do some work
// })
// // debugger;
