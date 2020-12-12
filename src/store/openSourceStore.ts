import Vue from 'vue';
import Vuex from 'vuex';
import { LicenseDependency, License, Dependency } from '../utils/types';

Vue.use(Vuex)

export default {
  state: {
    overview: {
      critical: 5,
      high: 0,
      medium: 1,
      low: 2,
      none: 0,
      criticalFixable: 2,
      highFixable: 0,
      mediumFixable: 0,
      lowFixable: 1,
      noneFixable: 0,
      highMature: 0,
      highAction: 0,
    },
    updated: false,
    licUpdated: false,
    // graph 1
    charOptions: {
      series: [{
          data: [],
        }],
        chart: { type: 'pie' },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '{point.name}: <b>{point.percentage:.1f} %'
          }
        }
      },
      caption: {
        text: 'This chart display the current distribution of all vulnerabilities accross the board.',
      },
      title: {
        text: 'Vulnerabilities distribution',
      },
      tooltip: {
        pointFormat: '{point.name}: <b>{point.y}</b>'
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
    },
    // graph 2
    licenseChart: {
      series: [{
        data: [],
      }],
      chart: { type: 'pie' },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '{point.name}: <b>{point.percentage:.1f} %'
          }
        }
      },
      caption: {
        text: 'This chart display the current distribution of licenses accross all the dependencies.',
      },
      title: {
        text: 'License distribution',
      },
      tooltip: {
        pointFormat: '{point.name}: <b>{point.y}</b>'
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
    },
    // package chart
    packageChart: {
      series: [{
        data: [],
      }],
      chart: { type: 'pie' },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '{point.name}: <b>{point.percentage:.1f} %'
          }
        }
      },
      caption: {
        text: 'This chart display the current distribution of your package managers.',
      },
      title: {
        text: 'Dependency distribution',
      },
      tooltip: {
        pointFormat: '{point.name}: <b>{point.y}</b>'
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
    },
    // dependencies metrics
    dependencies: {
      updated: false,
      outdated: 0,
      deprecated: 0,
      total: 0,
      vulnerable: 0,
      deprecatedAndVuln: 0,
      outdatedAndVuln: 0,
      updatedAndVuln: 0,
    }
  },
  mutations: {
    aggregatePie(state, payload) {
      const overview = payload.overview;
      state.charOptions.series[0].data = [
        {
          name: 'Critical',
          y: overview.critical,
          color: 'purple',
        },
        {
          name: 'High',
          y: overview.high,
          color: 'red',
        },
        {
          name: 'Medium',
          y: overview.medium,
          color: 'orange',
        },
        {
          name: 'Low',
          y: overview.low,
          color: 'green',
        },
        {
          name: 'None',
          y: overview.none,
          color: 'grey',
        },
      ];
    },
    aggregate(state, payload) {
      state.overview = payload.overview;
      state.updated = true;
    },
    updateLicense(state, licenses: License[]) {
      state.licUpdated = true;
      state.licenseChart.series[0].data = licenses.map( l => { return { name: l.id, y: l.dependencies.length}})
    },
    updatePackage(state, packManager) {
      state.packageChart.series[0].data = Object.entries(packManager).map( ([key, value]) => { return { name: key, y: value}});
    },
    updateDependencies(state, dependencies: Dependency[]) {
      // TODO move logic outside of the store
      state.dependencies.outdated = dependencies.filter( d => d.version != d.latestVersion).length;
      state.dependencies.deprecated = dependencies.filter( d => d.isDeprecated).length;
      state.dependencies.total = dependencies.length;
      state.dependencies.vulnerable = dependencies.filter( d => d.issuesHigh > 0 || d.issuesMedium > 0 || d.issuesLow > 0).length;
      state.dependencies.deprecatedAndVuln = dependencies.filter( d => d.isDeprecated  && (d.issuesHigh > 0 || d.issuesMedium > 0 || d.issuesLow > 0)).length;
      state.dependencies.outdatedAndVuln = dependencies.filter( d => d.version != d.latestVersion && (d.issuesHigh > 0 || d.issuesMedium > 0 || d.issuesLow > 0)).length;
      state.dependencies.updatedAndVuln = dependencies.filter( d => d.version == d.latestVersion && (d.issuesHigh > 0 || d.issuesMedium > 0 || d.issuesLow > 0)).length;
      state.dependencies.updated = true;
    },   
  },
  getters: {
    chartOptions: state => state.charOptions,
    licenseChart: state => state.licenseChart,
    packageChart: state => state.packageChart,
    overview: state => state.overview,
    updated: state => state.updated,
    licUpdated: state => state.licUpdated,
    dependencies: state => state.dependencies,
  },
  modules: {
  }
};
