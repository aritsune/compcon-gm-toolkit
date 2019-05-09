import Vue from 'vue';
import Vuex from 'vuex';

import npcDesigner from './npcDesigner';
import NPC from '@/logic/NPC';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  plugins: [
    (store: any) =>
      store.subscribe((mutation: any, state: any) => {
        console.log(mutation.type);
        localStorage.setItem(
          'npcs',
          JSON.stringify(state.npcDesigner.npcs.map((n: NPC) => n.serialize())),
        );
      }),
  ],
  modules: { npcDesigner },
});
