import Vue from 'vue';
import Vuex from 'vuex';

import npcDesigner from './npcDesigner';
import encounterBuilder from './encounterBuilder';
import encounterRunner from './encounterRunner';
import NPC from '@/logic/NPC';
import EncounterBase from '@/logic/EncounterBase';
import ActiveEncounter from '@/logic/ActiveEncounter';

Vue.use(Vuex);

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
  modules: { npcDesigner, encounterBuilder, encounterRunner },
});
