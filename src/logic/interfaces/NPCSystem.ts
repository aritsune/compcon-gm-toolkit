export module NPCSystem {
  interface Base {
    name: string;
    class: string;
    effect?: string;
    base: boolean;
    tags?: string;
  }

  export interface Roll {
    flat?: {
      val: number;
      pertier: boolean;
    };
    accdiff?: {
      val: number;
      pertier: boolean;
    };
  }

  export interface NonWeapon extends Base {
    recharge?: number;
    type: 'system' | 'trait';
    action?:
      | 'free'
      | 'quick'
      | 'full'
      | 'protocol'
      | 'reaction'
      | 'quicktech'
      | 'fulltech';
    tech_roll?: Roll;
  }

  export interface Weapon extends Base {
    type: 'weapon';
    weapon_type: [
      'Auxiliary' | 'Main' | 'Heavy' | 'Superheavy',
      'CQB' | 'Rifle' | 'Cannon' | 'Nexus' | 'Launcher' | 'Melee'
    ];
    // TODO: make tags into an array
    // tags: string[];
    weapon_roll: Roll;
    smart?: true;
    weapon_range: {
      type: string;
      val: number;
    }[];
    damage: {
      val: [number, number, number];
      type: string;
    }[];
  }
  export type Any = NonWeapon | Weapon;
}

// const mySystems: NPCSystem.Any[] =
