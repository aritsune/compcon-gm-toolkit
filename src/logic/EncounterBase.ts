import newId from './newId';
import NPC from './NPC';

export type EncounterBaseNPC = {
  npc: NPC;
  name: string;
  count: number;
};

export default class EncounterBase {
  id: string = newId();
  name: string;
  notes: string = '';
  npcs: EncounterBaseNPC[] = [];

  constructor(name: string) {
    this.name = name;
  }

  serialize() {
    return {
      id: this.id,
      name: this.name,
      notes: this.notes,
      npcs: this.npcs.map(npc => ({
        name: npc.name,
        count: npc.count,
        npcID: npc.npc.id,
      })),
    };
  }
}
