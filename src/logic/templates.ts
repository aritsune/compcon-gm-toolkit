import NPCTemplate from './interfaces/NPCTemplate';

const templates: NPCTemplate[] = [
  {
    name: 'ultra',
    features: [
      {
        name: 'Bonus activations',
        description:
          'The Ultra can be activated again (take another turn) each round. If the Ultra is facing more than 4 hostile player characters or NPCs at the start of a combat scene, it gets another activation (for a total of 3). It regains spent reactions each time it takes a turn.',
      },
      {
        name: 'Deadly',
        description:
          'The Ultra can Critical Hit, dealing an extra +3/5/7 bonus damage on Critical Hits.',
      },
    ],
    traits: [
      {
        name: 'Juggernaut',
        effect:
          'At the end of its turn, the Ultra ends one condition affecting it.',
      },
      {
        name: 'Legendary',
        effect:
          'The Ultra can enter the CRITICAL state and is not destroyed when reaching 0 HP.',
      },
      {
        name: 'Reflex',
        effect:
          'The Ultra has unlimited overwatch reactions (it can still only many 1 reaction per turn).',
      },
    ],
    statTransform(stats) {
      return {
        ...stats,
        structure: 4,
        stress: 4,
        hp: stats.hp + 5,
      };
    },
    incompatibleTemplates: ['elite', 'grunt'],
  },
  {
    name: 'elite',
    features: [
      {
        name: 'Bonus Activation',
        description: 'The Elite can be activated twice a round',
      },
    ],
    traits: [],
    statTransform(stats) {
      return {
        ...stats,
        structure: 2,
        stress: 2,
      };
    },
    incompatibleTemplates: ['ultra', 'grunt'],
  },
  {
    name: 'grunt',
    features: [
      {
        name: 'Chaff',
        description:
          'The grunt has 1 HP and cannot gain more. Grunts don’t take damage if they pass a successful save (such as on certain area of effect attacks) but otherwise take damage normally.',
      },
      {
        name: 'Weak',
        description:
          'Weak: The grunt only has 1 structure and stress maximum. If it takes any heat, it shuts down.',
      },
    ],
    traits: [],
    statTransform: stats => stats,
    statCaps: {
      hp: 1,
      structure: 1,
      stress: 1,
    },
    incompatibleTemplates: ['ultra', 'grunt', 'veteran', 'elite', 'squad'],
  },
  {
    name: 'veteran',
    features: [
      {
        name: 'Veterancy',
        description:
          'Veterancy: The Veteran gains +1 accuracy on all checks and saves of one statistic: Hull, Agility, Systems, Engineering (choose on creation)',
      },
    ],
    traits: [],
    statTransform: stats => ({
      ...stats,
      structure: stats.structure! + 1,
      stress: stats.stress! + 1,
    }),
    incompatibleTemplates: [],
  },
];

export default templates;
