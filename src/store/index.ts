import Vue from 'vue';
import Vuex from 'vuex';

import npcDesigner from './npcDesigner';
import encounterBuilder from './encounterBuilder';
import NPC from '@/logic/NPC';
import EncounterBase from '@/logic/EncounterBase';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  plugins: [
    (store: any) =>
      store.subscribe((mutation: any, state: any) => {
        console.log(mutation);
        localStorage.setItem(
          'npcs',
          JSON.stringify(state.npcDesigner.npcs.map((n: NPC) => n.serialize())),
        );
        localStorage.setItem(
          'encounters',
          JSON.stringify(
            state.encounterBuilder.encounters.map((e: EncounterBase) =>
              e.serialize(),
            ),
          ),
        );
      }),
  ],
  modules: { npcDesigner, encounterBuilder },
});
