import { reduce } from 'highcharts';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default {
  state: {
    charOptions: {
      series: [
        {
          data: [
            {
              name: 'High',
              y: 0,
            },
            {
              name: 'Medium',
              y: 2,
            },
            {
              name: 'Low',
              y: 3,
            },
          ],
        },
      ],
      chart: {
        type: 'pie',
      },
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
        pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
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
      state.charOptions.series[0].data = [
        {
          name: 'High',
          y: payload.high,
          color: 'red',
        },
        {
          name: 'Medium',
          y: payload.medium,
          color: 'orange',
        },
        {
          name: 'Low',
          y: payload.low,
          color: 'green',
        },
      ]
    }
  },
  getters: {
    chartOptions: state => state.charOptions,
  },
  modules: {
  }
};
