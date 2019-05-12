import newId from './newId';
import NPC from './NPC';

type EncounterBaseNPC = {
  npcID: string;
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
      npcs: this.npcs,
    };
  }
}
