import NPC from '../logic/NPC';

export default {
  namespaced: true,
  state: {
    npcs: [
      {
        name: 'My Assault',
        class: 'assault',
        tier: 2,
        templates: [],
        systems: ['Micro-missile Barrage'],
      },
      {
        name: 'My Archer',
        class: 'archer',
        tier: 0,
        templates: [],
        systems: ['SSC Core Flight System', 'Boosted Reactor', 'Hail of Fire'],
      },
      {
        name: 'My Goliath',
        class: 'goliath',
        tier: 1,
        templates: [],
        systems: ['Armored', 'Watchful Guardian'],
      },
    ].map(NPC.deserialize),
  },
};
