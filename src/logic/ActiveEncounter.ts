import EncounterBase from './EncounterBase';
import newId from './newId';
import NPC from './NPC';

export class ActiveNPC {
  id: string;
  baseNPC: NPC;
  hp: number;
  heat: number;
  structure: number;
  stress: number;
  destroyed: boolean;
  static baseStatuses: { name: string }[] = require('lancer-data').statuses;
  statuses: string[];

  constructor(npc: NPC) {
    this.id = newId();
    this.baseNPC = npc;
    const { stats } = this.baseNPC;
    this.hp = stats.hp;
    this.heat = 0;
    this.structure = stats.structure;
    this.stress = 0;
    this.destroyed = false;
    this.statuses = [];
  }

  serialize() {
    return {
      id: this.id,
      npc: this.baseNPC.serialize(),
      hp: this.hp,
      heat: this.heat,
      structure: this.structure,
      stress: this.stress,
      destroyed: this.destroyed,
      statuses: this.statuses,
    };
  }

  static deserialize(obj: ReturnType<ActiveNPC['serialize']>) {
    const baseNPC = NPC.deserialize(obj.npc);
    const activeNPC = new ActiveNPC(baseNPC);
    if (obj.id) activeNPC.id = obj.id;
    activeNPC.hp = obj.hp;
    activeNPC.heat = obj.heat;
    activeNPC.structure = obj.structure;
    activeNPC.stress = obj.stress;
    activeNPC.destroyed = obj.destroyed;
    activeNPC.statuses = obj.statuses;
    return activeNPC;
  }
}

export default class ActiveEncounter {
  id: string = newId();
  name: string;
  notes: string;
  npcs: ActiveNPC[];

  constructor(enc: EncounterBase);
  constructor(enc: { id: string; name: string; notes: string; npcs: any[] }) {
    this.name = enc.name;
    this.notes = enc.notes;
    if (enc instanceof EncounterBase) {
      this.npcs = enc.npcs.map(({ npc }) => new ActiveNPC(npc));
    } else {
      this.npcs = enc.npcs.map(n => ActiveNPC.deserialize(n));
      this.id = enc.id;
    }
  }

  serialize() {
    return {
      id: this.id,
      name: this.name,
      notes: this.notes,
      npcs: this.npcs.map(npc => npc.serialize()),
    };
  }
}
