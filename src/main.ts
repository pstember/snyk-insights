import '@babel/polyfill';
import 'mutationobserver-shim';
import Vue from 'vue';
import Vuex from 'vuex'
import store from './store'
import App from './App.vue';
// Snyk API import
import SnykAPI from './utils/http-client-snyk';
import { APIFiltersBodyRequest, APIHeaderRequest } from './utils/apiTypes';
import { Dependency, Issue, License } from './utils/types';
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
    type: ['vuln', 'license'],
}};

// fetch vuln and store them in memory
const vulns: Issue[] = [];
apiClient.listAllIssues(reqBody).then( (responseArr) => {  
  responseArr.map( res => {
    res.data.results.map( (item: { issue: Issue }) => vulns.push(item.issue));
  });

  // debugger;

  const v = vulns;
  const overview = {
    critical: v.filter( (x) => +x.cvssScore >= 9.0 ).length,
    criticalFixable: v.filter( (x) => +x.cvssScore >= 9.0 ).filter( (x) => x.isUpgradable || x.isPatchable || x.isPinnable ).length,
    high: v.filter( (x) => +x.cvssScore < 9.0 && +x.cvssScore >= 7.0 ).length,
    highFixable: v.filter( (x) => +x.cvssScore < 9.0 && +x.cvssScore >= 7.0 ).filter( (x) => x.isUpgradable || x.isPatchable || x.isPinnable ).length,
    highMature: v.filter( (x) => +x.cvssScore < 9.0 && +x.cvssScore >= 7.0 ).filter( x=> x.exploitMaturity == "mature").length,
    highAction: v.filter( (x) => +x.cvssScore < 9.0 && +x.cvssScore >= 7.0 ).filter( (x) => x.isUpgradable || x.isPatchable || x.isPinnable ).filter( x=> x.exploitMaturity == "mature").length,
    medium: v.filter( (x) => +x.cvssScore < 7.0 && +x.cvssScore >= 4.0 ).length,
    mediumFixable: v.filter( (x) => +x.cvssScore < 7.0 && +x.cvssScore >= 4.0 ).filter( (x) => x.isUpgradable || x.isPatchable || x.isPinnable ).length,
    low: v.filter( (x) => +x.cvssScore < 4.0 && +x.cvssScore > 0.0 ).length, 
    lowFixable: v.filter( (x) => +x.cvssScore < 4.0 && +x.cvssScore > 0.0 ).filter( (x) => x.isUpgradable || x.isPatchable || x.isPinnable ).length, 
    none: v.filter( (x) => +x.cvssScore == 0.0 ).length,
    noneFixable: v.filter( (x) => +x.cvssScore == 0.0 ).filter( (x) => x.isUpgradable || x.isPatchable || x.isPinnable ).length,
  }

  // debugger;
  
  // updating store for dynamic rendering
  store.dispatch('process', {
    overview: overview
  });
});

const licenses: License[] = [];
const params: APIHeaderRequest = {
  org: process.env.VUE_APP_ORG,
}
apiClient.listLicenses(params,reqBody).then( (response) => {
  store.commit('updateLicense', response.data.results);
});


// fetch dependencies and store insights in memory
const deps: Dependency[] = [];
const packageManagerCount = {};
apiClient.listAllDependencies(params, reqBody).then( (responseArr) => {  
  responseArr.map( res => {
    res.data.results.map( item => {
      packageManagerCount[item.type] = (packageManagerCount[item.type] || 0) + 1 
      deps.push(item);
    });
  });

  // debugger;

  // updating store for dynamic rendering
  store.commit('updatePackage', packageManagerCount);
  store.commit('updateDependencies', deps);
});

// If I need something done when ALL the request have been processed
// For example, display all data loaded or whatever. left here for later
// Promise.all([<list all requests here>]).then( () => {
//     // do some work
// })
// // debugger;
