import Vue from 'vue';
import Vuex from 'vuex';

import npcDesigner from './npcDesigner';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { npcDesigner },
});
