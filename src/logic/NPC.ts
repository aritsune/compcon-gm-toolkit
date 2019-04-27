import NPCClass from './interfaces/NPCClass';
import { NPCSystem } from './interfaces/NPCSystem';

const systems: NPCSystem.Any[] = require('../../static/systems.json');

export default class NPC {
  npcClass: NPCClass;
  tier: 0 | 1 | 2;
  private _name?: string;

  optionalSystems: NPCSystem.Any[] = [];

  constructor(npcClass: NPCClass, tier?: 0 | 1 | 2) {
    this.npcClass = npcClass;
    this.tier = tier || 0;
  }

  get class_systems() {
    return systems.filter(s => s.class === this.npcClass.name);
  }

  get base_class_systems() {
    return this.class_systems.filter(s => s.base);
  }

  get optional_class_systems() {
    return this.class_systems.filter(s => !s.base);
  }

  get name() {
    return this._name || this.npcClass.name;
  }
  set name(name: string) {
    this._name = name;
  }

  get stats() {
    return this.npcClass.stats[this.tier];
  }

  get systems() {
    return this.base_class_systems.concat(this.optionalSystems);
  }
}
