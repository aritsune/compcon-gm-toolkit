import NPC from '../logic/NPC';
import _ from 'lodash';

export default {
  namespaced: true,
  state: {
    npcs: [
      {
        id: '11231',
        class: 'assault',
        tier: 2,
        name: 'My Assault',
        templates: ['ultra', 'veteran'],
        systems: ['Micro-missile Barrage'],
      },
      {
        id: '5531',
        class: 'archer',
        tier: 0,
        name: 'My Archer',
        templates: [],
        systems: ['SSC Core Flight System', 'Boosted Reactor', 'Hail of Fire'],
      },
      {
        id: '22212',
        class: 'goliath',
        tier: 1,
        name: 'My Goliath',
        templates: [],
        systems: ['Armored', 'Watchful Guardian'],
      },
    ].map(NPC.deserialize),
  },
  mutations: {
    delete(state: any, id: string) {
      _.remove(state.npcs, { id });
    },
  },
};
