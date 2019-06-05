import Vue from 'vue';
import Vuex from 'vuex';

import NPC from '@/gm_toolkit/logic/NPC';
import EncounterBase from '@/gm_toolkit/logic/EncounterBase';
import ActiveEncounter from '@/gm_toolkit/logic/ActiveEncounter';

Vue.use(Vuex);

import storeModules from '@/gm_toolkit/store'

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  plugins: [
    (store: any) =>
      store.subscribe((mutation: any, state: any) => {
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
        localStorage.setItem(
          'activeEncounters',
          JSON.stringify(
            state.encounterRunner.activeEncounters.map((e: ActiveEncounter) =>
              e.serialize(),
            ),
          ),
        );
      }),
  ],
  modules: storeModules,
});
