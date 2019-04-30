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
  {
    name: 'exotic',
    features: [
      {
        name: 'Xenotech',
        description: 'Scans reveal no information about exotic modules',
      },
      {
        name: 'Hardened Target',
        description:
          'Tech attacks take +1 difficulty against this character, and it makes all systems saves with +1 accuracy',
      },
      {
        name: 'Exotic Systems',
        description:
          'Any NPC with the exotic tag can choose one or two optional exotic modules',
      },
    ],
    traits: [],
    incompatibleTemplates: [],
  },

  {
    name: 'drone',
    features: [
      {
        name: 'No Pilot',
        description:
          'The Drone permanently suffers from the Impaired condition. It cannot make complex decisions or moral judgements. However, it is also immune to all systems and actions that would affect the pilot (it doesn’t have any).',
      },
      {
        name: 'Vulnerable to Tech',
        description:
          'All hostile tech actions against the Drone can be made with +1 Accuracy.',
      },
    ],
    traits: [],
    statTransform(stats) {
      return {
        ...stats,
        hp: stats.hp + 5,
      };
    },
    incompatibleTemplates: [],
  },

  {
    name: 'mercenary',
    features: [
      {
        name: 'Opportunist',
        description:
          'The Mercenary gets +1 accuracy on any attack when there’s an allied target in engagement to the target of its attack',
      },
      {
        name: 'Mercenary systems',
        description:
          'A mercenary can choose from the list of mercenary systems and traits when choosing optional systems and modules',
      },
    ],
    traits: [],
    incompatibleTemplates: [],
  },

  {
    name: 'commander',
    features: [],
    traits: [
      {
        name: 'Command',
        effect:
          'Once per round, the Commander can cause an allied character it can see to re-roll any single attack roll or check as a reaction. The commander can’t use this reaction if it is Jammed.',
      },
    ],
    statTransform: stats => ({
      ...stats,
      structure: stats.structure! + 1,
      stress: stats.stress! + 1,
    }),
    incompatibleTemplates: [],
  },
  {
    name: 'pirate',
    features: [
      {
        name: 'Pirate modules',
        description:
          'A pirate can choose from the list of pirate modules when choosing optional systems and modules',
      },
    ],
    traits: [
      {
        name: 'Deadly',
        effect:
          'The pirate can Critical Hit, dealing +2/3/4 bonus damage on ranged or melee critical hits.',
      },
    ],
    incompatibleTemplates: [],
  },

  {
    name: 'spacer',
    features: [
      {
        name: 'Optional modules',
        description:
          'A spacer can choose from the list of spacer modules when choosing optional systems and modules',
      },
    ],
    traits: [
      {
        name: 'Maneuverable',
        effect:
          'The Spacer does not suffer the impaired condition for operating in space, underwater, or in zero-g environments and always counts as having an EVA module in those environments.',
      },
    ],
    incompatibleTemplates: [],
  },
  {
    name: 'Outworlder',
    features: [
      {
        name: 'Resourceful',
        description:
          'The Outworlder gains +1 use to all (limited) use weapons, actions, and deployables (including the repair action below - not yet included in the profile).',
      },
    ],
    traits: [
      {
        name: 'Repair',
        effect:
          'Full Action, Limited(1). This mech heals 1/2 HP and ends one condition currently affecting it (impaired, Slowed, immobilized, shut down, jammed).',
      },
    ],
    incompatibleTemplates: [],
  },

  {
    name: 'vehicle',
    features: [
      {
        name: 'Limited Maneuverability',
        description:
          'A vehicle must always move in a straight line (though it can move and boost in separate directions). A vehicle cannot climb or swim, and cannot right itself from prone without an adjacent allied character.',
      },
      {
        name: 'Crew',
        description:
          'A vehicle might be operated by more than one crew member (typically a minimum number of crew equal to ½ of the vehicle’s size).',
      },
      {
        name: 'No Manipulators',
        description:
          'A vehicle cannot initiate a grapple, pick up, or manipulate items',
      },
      {
        name: 'Limited Melee Attacks',
        description: 'A vehicle cannot make melee attacks other than Ram.',
      },
      {
        name: 'Type',
        description:
          'You can give a vehicle one or more of the following types: Flier: A flying vehicle can fly when it moves or boosts - Transport: A transport vehicle can hold one squad or a number of entities whose total size (added together) is less than its size - Treads or Hover: A Treaded or Hover vehicle ignores difficult terrain',
      },
    ],
    traits: [],
    incompatibleTemplates: [],
  },

  {
    name: 'ship',
    features: [
      {
        name: 'Flier',
        description:
          'A ship always counts as having an EVA module in space. In atmosphere, it hovers (it can fly when it moves or boosts, doesn’t have to move in a straight line, and doesn’t have to move on its turn while flying). If it is immobilized, shut down, or stunned mid-air, it crashes.',
      },
      {
        name: 'Massive size',
        description:
          'A ship is typically much larger than a mech. If its size is less than 4, increase its size to 4. This template describes ships that can be engaged on a ship-tomech level. Typical ships (size 10/20+) are usually too heavily armored for mech-mounted weapons to harm them.',
      },
      {
        name: 'Crew',
        description:
          'A ship might be operated by more than one crew member (typically a minimum number of crew equal to ½ of the vehicle’s size).',
      },
      {
        name: 'No Manipulators',
        description:
          'A ship cannot initiate a grapple, pick up, or manipulate items',
      },
      {
        name: 'Limited Melee Attacks',
        description: 'A ship cannot make melee attacks other than Ram.',
      },
      {
        name: 'Transport',
        description:
          'A transport ship can hold one squad or a number of entities whose total size (added together) is less than its size.',
      },
    ],
    traits: [],
    statTransform(stats) {
      return {
        ...stats,
        hp: stats.hp + 5,
      };
    },
    incompatibleTemplates: [],
  },
];

export default templates;
