import Vue from 'vue';
import Vuex from 'vuex';

import store from '../store'
// Snyk API import
import SnykAPI from '../utils/http-client-snyk';
import { APIFiltersBodyRequest as APIFiltersVulnBodyRequest, APIHeaderRequest } from '../utils/apiTypes';
import { Dependency, Issue } from '../utils/types';

Vue.use(Vuex)

export default class OpenSource {
 
  protected static apiClient: SnykAPI = SnykAPI.getInstance();

  // Open-source data fetching
  // Define header for counting vulns
  protected static  reqVulnBody: APIFiltersVulnBodyRequest = { 
    filters: { 
      orgs: [process.env.VUE_APP_ORG],
      languages: ['javascript', 'ruby', 'java', 'scala', 'python', 'golang', 'php', 'dotnet', 'swift'],
      type: ['vuln'],
  }};
  protected static  reqLicBody: APIFiltersVulnBodyRequest = { 
    filters: { 
      orgs: [process.env.VUE_APP_ORG],
      languages: ['javascript', 'ruby', 'java', 'scala', 'python', 'golang', 'php', 'dotnet', 'swift'],
      type: ['license'],
  }};

  public static async load() {
    OpenSource.loadIssues();
    OpenSource.loadDependencies();
    OpenSource.loadLicenses();
  }

  protected static async loadIssues() {
    // fetch vuln and store them in memory
    const vulns: Issue[] = [];
    OpenSource.apiClient.listAllIssues(OpenSource.reqVulnBody).then( (responseArr) => {  
      responseArr.map( res => {
        res.data.results.map( (item: { issue: Issue }) => vulns.push(item.issue));
      });

      // debugger;

      const criticals = vulns.filter( x => +x.cvssScore >= 9.0 );
      const highs = vulns.filter( x => +x.cvssScore < 9.0 && +x.cvssScore >= 7.0 );
      const mediums = vulns.filter( x => +x.cvssScore < 7.0 && +x.cvssScore >= 4.0 );
      const lows = vulns.filter( x => +x.cvssScore < 4.0 && +x.cvssScore > 0.0 );
      const nones = vulns.filter( x => +x.cvssScore == 0.0 );
      const vulnerabilitiesPayload = {

        metrics: {
          critical: criticals.length,
          criticalFixable: criticals.filter( (x) => x.isUpgradable || x.isPatchable || x.isPinnable ).length,
          
          high: highs.length,
          highFixable: highs.filter( (x) => x.isUpgradable || x.isPatchable || x.isPinnable ).length,
          highMature: highs.filter( x=> x.exploitMaturity == "mature").length,
          highAction: highs.filter( (x) => x.isUpgradable || x.isPatchable || x.isPinnable ).filter( x=> x.exploitMaturity == "mature").length,
          
          medium: mediums.length,
          mediumFixable: mediums.filter( x => x.isUpgradable || x.isPatchable || x.isPinnable ).length,
          
          low: lows.length, 
          lowFixable: lows.filter( (x) => x.isUpgradable || x.isPatchable || x.isPinnable ).length, 
          
          none: nones.length,
          noneFixable: nones.filter( x => x.isUpgradable || x.isPatchable || x.isPinnable ).length,
        },
        data: [
          {
            name: 'Critical',
            y: criticals.length,
            color: 'purple',
          },
          {
            name: 'High',
            y: highs.length,
            color: 'red',
          },
          {
            name: 'Medium',
            y: mediums.length,
            color: 'orange',
          },
          {
            name: 'Low',
            y: lows.length,
            color: 'green',
          },
          {
            name: 'None',
            y: nones.length,
            color: 'grey',
          },
        ],
      }

      // debugger;
      
      // updating store for dynamic rendering
      store.commit('updateVulnerabilities', vulnerabilitiesPayload);
    });
  }

  protected static async loadLicenses() {
    // fetch license and process info
    const params: APIHeaderRequest = {
      org: process.env.VUE_APP_ORG,
    }
    OpenSource.apiClient.listLicenses(params,OpenSource.reqVulnBody).then( (response) => {
      store.commit('updateLicense', response.data.results);
    });

    OpenSource.apiClient.countIssues(OpenSource.reqLicBody).then( response => {
      store.commit('updateLicenseCount', response.data.results[0].severity);
    });
  }

  protected static async loadDependencies() {
    const params: APIHeaderRequest = {
      org: process.env.VUE_APP_ORG,
    }
    // fetch dependencies and store insights in memory
    const dependencies: Dependency[] = [];
    const packageManagerCount = {};
    OpenSource.apiClient.listAllDependencies(params, OpenSource.reqVulnBody).then( (responseArr) => {  
      responseArr.map( res => {
        res.data.results.map( (item: Dependency) => {
          packageManagerCount[item.type] = (packageManagerCount[item.type] || 0) + 1;
          dependencies.push(item);
        });
      });

      // count duplicate version of a lib
      // Assumption is that a dep is unique in the array per version (untested so far)
      let duplicateDepCount = 0;
      dependencies.sort( (a,b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0); //TODO refactor this in a sexy manner
      for(let i=1; i < dependencies.length; i++) {
        if( dependencies[i-1].name == dependencies[i].name && dependencies[i-1].version != dependencies[i].version) {
          duplicateDepCount++;
        }
      }

      // debugger;
      const depsPayload = {
        outdated: dependencies.filter( d => d.version != d.latestVersion).length,
        deprecated: dependencies.filter( d => d.isDeprecated).length,
        total: dependencies.length,
        vulnerable: dependencies.filter( d => d.issuesHigh > 0 || d.issuesMedium > 0 || d.issuesLow > 0).length,
        deprecatedAndVuln: dependencies.filter( d => d.isDeprecated  && (d.issuesHigh > 0 || d.issuesMedium > 0 || d.issuesLow > 0)).length,
        outdatedAndVuln: dependencies.filter( d => d.version != d.latestVersion && (d.issuesHigh > 0 || d.issuesMedium > 0 || d.issuesLow > 0)).length,
        updatedAndVuln: dependencies.filter( d => d.version == d.latestVersion && (d.issuesHigh > 0 || d.issuesMedium > 0 || d.issuesLow > 0)).length,
        updated: true,
        duplicate: duplicateDepCount,
      }

      // updating store for dynamic rendering
      store.commit('updatePackage', packageManagerCount);
      store.commit('updateDependencies', depsPayload);
    });
  }

}
