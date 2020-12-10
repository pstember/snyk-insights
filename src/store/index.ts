import Vue from 'vue';
import Vuex from 'vuex';

import OpenSourceStore from './openSourceStore';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    process (context, payload) {
      context.commit('aggregate', payload);
      context.commit('aggregatePie', payload); // from Piestore
    }
  },
  getters: {
  },
  modules: {
    oss: OpenSourceStore,
  }
})
