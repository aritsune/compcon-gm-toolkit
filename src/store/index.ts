import Vue from 'vue';
import Vuex from 'vuex';

import npcDesigner from './npc-designer';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { npcDesigner },
});
