import { License } from '../utils/types';

export default {
  state: {
    vulnerabilities: {
      metrics: {
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
      // vulnerability graph
      vulnsCharOptions: {
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
              format: '{point.name}: <b>{point.percentage:.1f} %',
            },
          },
        },
        caption: {
          text: 'This chart display the current distribution of all vulnerabilities accross the board.',
        },
        title: {
          text: 'Vulnerabilities distribution',
        },
        tooltip: {
          pointFormat: '{point.name}: <b>{point.y}</b>',
        },
        accessibility: {
          point: {
            valueSuffix: '%',
          },
        },
      },
    },
    licUpdated: false,
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
      duplicate: 0,
    },
    licenses: {
      high: 0,
      medium: 0,
      low: 0,
      total: 0,
    }
  },
  mutations: {
    updateVulnerabilities(state, payload) {
      state.vulnerabilities.metrics = payload.metrics;
      state.vulnerabilities.vulnsCharOptions.series[0].data = payload.data;
      state.vulnerabilities.updated = true;
    },
    updateLicense(state, licenses: License[]) {
      state.licUpdated = true;
      state.licenseChart.series[0].data = licenses.map( l => { return { name: l.id, y: l.dependencies.length}});
      state.licenses.total = state.licenses.total + licenses.reduce( (sum, current) => sum + current.dependencies.length, 0 );
    },
    updateLicenseCount(state, payload) {
      state.licenses.high = payload.high;
      state.licenses.medium = payload.medium;
      state.licenses.low = payload.low;
      state.licenses.total = state.licenses.total - payload.low - payload.medium - payload.high;
    },
    updatePackage(state, packManager) {
      state.packageChart.series[0].data = Object.entries(packManager).sort(([key, value],[key2, value2]) => value2 - value).map( ([key, value]) => { return { name: key, y: value}});
    },
    updateDependencies(state, dependencies) {
      state.dependencies = dependencies;
    },
  },
  getters: {
    chartOptions: state => state.vulnerabilities.vulnsCharOptions,
    licenseChart: state => state.licenseChart,
    packageChart: state => state.packageChart,
    vulnerabilities: state => state.vulnerabilities,
    updated: state => state.updated,
    licUpdated: state => state.licUpdated,
    dependencies: state => state.dependencies,
    licenses: state => state.licenses,
  },
  modules: {
  }
};
