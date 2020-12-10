import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default {
  state: {
    overview: {
      critical: 5,
      high: 0,
      medium: 1,
      low: 2,
      none: 0,
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
    updateLicense(state, licenses) {
      state.licUpdated = true;
      state.licenseChart.series[0].data = licenses;
    }
  },
  getters: {
    chartOptions: state => state.charOptions,
    licenseChart: state => state.licenseChart,
    overview: state => state.overview,
    updated: state => state.updated,
    licUpdated: state => state.licUpdated,
  },
  modules: {
  }
};
