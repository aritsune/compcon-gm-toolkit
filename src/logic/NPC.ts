import NPCClass from './interfaces/NPCClass';
import { NPCSystem } from './interfaces/NPCSystem';
import NPCTemplate from './interfaces/NPCTemplate';

import _ from 'lodash';

const systems: NPCSystem.Any[] = require('../../static/systems.json');
const templates: NPCTemplate[] = require('./templates').default;

export default class NPC {
  npcClass: NPCClass;
  tier: 0 | 1 | 2;
  private _name?: string;

  private _pickedSystems: NPCSystem.Any[] = [];
  _templates: string[] = [];

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

  get pickedSystems() {
    return this._pickedSystems;
  }
  pickSystem(system: NPCSystem.Any) {
    this._pickedSystems.push(system);
  }
  removeSystem(system: NPCSystem.Any) {
    this._pickedSystems = this._pickedSystems.filter(
      sys => sys.name !== system.name,
    );
  }

  get systems() {
    const preSort = this.base_class_systems.concat(this.pickedSystems);
    return _.orderBy(
      preSort,
      ['base', 'type', 'name'],
      ['desc', 'desc', 'asc'],
    );
  }

  get templates() {
    return _.compact(
      this._templates.map(templateName =>
        _.find(templates, t => t.name === templateName),
      ),
    );
  }
  get incompatibleTemplateNames() {
    return _.uniq(_.flatten(this.templates.map(t => t.incompatibleTemplates)));
  }
  addTemplate(templateName: string) {
    if (this.incompatibleTemplateNames.includes(templateName))
      throw new Error(`incompatible template "${templateName}"!`);
    if (this._templates.includes(templateName))
      throw new Error(`NPC already has template "${templateName}"!`);
    const template = _.find(templates, t => t.name === templateName);
    if (!template) throw new Error(`invalid template name "${templateName}"!`);
    this._templates.push(templateName);
  }
  removeTemplate(templateName: string) {
    this._templates = _.without(this._templates, templateName);
  }

  get stats() {
    let tempStats = _.clone(this.npcClass.stats[this.tier]);
    tempStats.structure = 1;
    tempStats.stress = 1;

    let statCaps: { [key: string]: number } = {
      armor: 4,
    };

    for (const template of this.templates) {
      tempStats = template.statTransform(tempStats);
      if (template.statCaps) {
        for (const stat in template.statCaps) {
          const cap = template.statCaps[stat];
          if (!statCaps[stat] || cap < statCaps[stat]) {
            statCaps[stat] = cap;
          }
        }
      }
    }

    for (const stat in tempStats) {
      if (statCaps[stat] && statCaps[stat] < tempStats[stat]) {
        tempStats = {
          ...tempStats,
          [stat]: statCaps[stat],
        };
      }
    }

    return tempStats;
  }
}
