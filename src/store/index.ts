import { BIconPause } from 'bootstrap-vue';
import Vue from 'vue';
import Vuex from 'vuex';

import Piestore from './charts/pieChart';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    flavor: 'BANANAAAAAAA',
    critical: 5,
    high: 0,
    medium: 1,
    low: 2,
    none: 0,
    updated: false,
  },
  mutations: {
    change(state, flavor) {
      state.flavor = flavor
    },
    aggregate(state, payload) {
      state.critical = payload.critical;
      state.high = payload.high;
      state.medium = payload.medium;
      state.low = payload.low;
      state.none = payload.none;
      state.updated = true;
    }
  },
  actions: {
    process (context, payload) {
      context.commit('aggregate', payload);
      context.commit('aggregatePie', payload); // from Piestore
    }
  },
  getters: {
    flavor: state => state.flavor,
    critical: state => state.critical,
    high: state => state.high,
    medium: state => state.medium,
    low: state => state.low,
    none: state => state.none,
    updated: state => state.updated,
  },
  modules: {
    pie: Piestore,
  }
})
