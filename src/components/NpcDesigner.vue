<template>
  <b-container fluid>
    <transition name="fade" mode="out-in">
      <npc-class-picker
        class="window"
        v-if="state === 'picking-class'"
        @pick="pickClass"
      />
      <npc-class-display
        class="window"
        v-else-if="state === 'viewing-class'"
        :selected-class="selectedClass"
        @confirm="confirmClass"
        @cancel="cancelClass"
      />
      <b-card
        class="window"
        v-else-if="state === 'customizing'"
        :border-variant="`role--${selectedClass.role}`"
        :header-bg-variant="`role--${selectedClass.role}`"
        header-text-variant="white"
        :header="selectedClass.name.toUpperCase()"
      >
        <div class="text-uppercase font-weight-bold mb-1">Tier</div>
        <b-button-group>
          <b-button
            :active="npc.tier === 0"
            :variant="npc.tier === 0 ? 'secondary' : 'outline-secondary'"
            @click="npc.tier = 0"
          >
            <numeric1-icon style="font-size: 24px" />
          </b-button>
          <b-button
            :active="npc.tier === 1"
            :variant="npc.tier === 1 ? 'secondary' : 'outline-secondary'"
            @click="npc.tier = 1"
            ><numeric2-icon style="font-size: 24px"
          /></b-button>
          <b-button
            :active="npc.tier === 2"
            :variant="npc.tier === 2 ? 'secondary' : 'outline-secondary'"
            @click="npc.tier = 2"
            ><numeric3-icon style="font-size: 24px"
          /></b-button>
        </b-button-group>
        <b-card class="stat-table-card mx-auto my-3" style="width: 80%">
          <table class="table stat-table" style="table-layout: fixed">
            <thead class="text-uppercase bg-light" style="font-size: 0.7em;">
              <tr>
                <th>HP</th>
                <th>EVADE</th>
                <th>EDEF</th>
                <th>HEAT</th>
                <th>H</th>
                <th>A</th>
                <th>S</th>
                <th>E</th>
                <th>ARMOR</th>
                <th>SPD</th>
                <th>SENSE</th>
                <th>SAVE</th>
                <th>STRUCT</th>
                <th>STRESS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th
                  v-for="(value, i) in Object.values(npcStats)"
                  :key="i + '--' + value"
                >
                  <div>
                    {{ value }}
                  </div>
                </th>
              </tr>
            </tbody>
          </table>
        </b-card>
        <b-container fluid>
          <b-row>
            <b-col cols="6">
              <b-card
                bg-variant="light"
                header="chosen systems"
                class="pickercard"
              >
                <transition-group name="fade" tag="div" class="dragdiv">
                  <system-badge
                    v-for="system in npc.systems"
                    :key="system.name"
                    :system="system"
                    :closable="!system.base"
                    @closed="removeSystem(system)"
                  />
                </transition-group>
              </b-card>
            </b-col>
            <b-col cols="6">
              <b-card
                bg-variant="light"
                header="available systems"
                class="pickercard"
              >
                <div class="picker-divider" v-if="systemsAvailable.length">
                  Class
                </div>
                <transition-group name="fade" tag="div" class="dragdiv">
                  <system-badge
                    v-for="system in systemsAvailable"
                    :key="system.name"
                    :system="system"
                    addable
                    @added="addSystem(system)"
                  />
                </transition-group>
                <div
                  class="picker-divider"
                  v-if="npc.genericSystemsAvailable.length"
                >
                  Generic
                </div>
                <transition-group name="fade" tag="div" class="dragdiv">
                  <system-badge
                    v-for="system in npc.genericSystemsAvailable"
                    :key="system.name"
                    :system="system"
                    addable
                    @added="addSystem(system)"
                  />
                </transition-group>
              </b-card>
            </b-col>
          </b-row>
          <!-- Template picker -->
          <b-row class="mt-3">
            <b-col cols="6">
              <b-card
                bg-variant="light"
                header="chosen templates"
                class="pickercard"
                :move="checkMove"
              >
                <transition-group name="fade" tag="div" class="dragdiv">
                  <template-badge
                    v-for="template in npc.templates"
                    :key="template.name"
                    :tmp="template"
                    closable
                    @closed="npc.removeTemplate(template.name)"
                  />
                </transition-group>
              </b-card>
            </b-col>
            <b-col cols="6">
              <b-card
                bg-variant="light"
                header="available templates"
                class="pickercard"
              >
                <transition-group name="fade" tag="div" class="dragdiv">
                  <template-badge
                    v-for="template in availableTemplates"
                    :key="template.name"
                    :tmp="template"
                    :incompatible="templateIsIncompatible(template.name)"
                    addable
                    @added="addTemplate(template.name)"
                  />
                </transition-group>
              </b-card>
            </b-col>
          </b-row>
          <hr />
          <b-row>
            <b-col class="ml-auto">
              <b-button
                size="sm"
                block
                variant="outline-primary"
                @click="$emit('newnpc', npc)"
              >
                <check-circle-icon style="font-size: 24px;" />
              </b-button>
            </b-col>
          </b-row>
        </b-container>
      </b-card>
    </transition>
  </b-container>
</template>

<script lang="ts">
import Vue from 'vue';
import _ from 'lodash';
import NpcClassPicker from './NpcClassPicker.vue';
import NpcClassDisplay from './NpcClassDisplay.vue';

import SystemBadge from './Badges/SystemBadge.vue';
import TemplateBadge from './Badges/TemplateBadge.vue';

import CheckCircleIcon from 'vue-material-design-icons/CheckCircle.vue';

import Numeric1Icon from 'vue-material-design-icons/Numeric1.vue';
import Numeric2Icon from 'vue-material-design-icons/Numeric2.vue';
import Numeric3Icon from 'vue-material-design-icons/Numeric3.vue';

import smoothReflow from 'vue-smooth-reflow';

import NPCClass, { NPCStatBlock } from '@/logic/interfaces/NPCClass';
import { NPCSystem } from '@/logic/interfaces/NPCSystem';
import NPC from '@/logic/NPC.ts';

import templates from '@/logic/templates';
import NPCTemplate from '../logic/interfaces/NPCTemplate';

const fieldSorter = (fields: string[]) => (a: any, b: any) =>
  fields
    .map(o => {
      let dir = 1;
      if (o[0] === '-') {
        dir = -1;
        o = o.substring(1);
      }
      return a[o] > b[o] ? dir : a[o] < b[o] ? -dir : 0;
    })
    .reduce((p, n) => (p ? p : n), 0);

export default Vue.extend({
  mixins: [smoothReflow],
  name: 'npc-designer',
  components: {
    NpcClassPicker,
    NpcClassDisplay,
    SystemBadge,
    TemplateBadge,
    CheckCircleIcon,
    Numeric1Icon,
    Numeric2Icon,
    Numeric3Icon,
  },
  data() {
    return {
      state: 'picking-class',
      selectedClass: null as NPCClass | null,
      npc: null as NPC | null,
    };
  },
  methods: {
    pickClass(cl: NPCClass) {
      this.selectedClass = cl;
      this.state = 'viewing-class';
    },
    cancelClass() {
      this.selectedClass = null;
      this.state = 'picking-class';
    },
    confirmClass() {
      if (!this.selectedClass) throw new Error('invalid class');
      this.npc = new NPC(this.selectedClass);
      this.state = 'customizing';
    },
    addSystem(system: NPCSystem.Any) {
      this.npc!.pickSystem(system);
    },
    removeSystem(system: NPCSystem.Any) {
      this.npc!.removeSystem(system);
    },
    checkMove(evt: any) {
      return false;
    },
    addTemplate(templateName: string) {
      if (!this.npc) throw new Error('no npc');
      this.npc.addTemplate(templateName);
    },
    templateIsIncompatible(templateName: string): string[] | false {
      if (!this.npc) throw new Error('no npc');
      const template = templates.find(t => t.name === templateName);
      const incompatibleNpcTemplates =
        (template && template.incompatibleTemplates) || [];
      return (
        (this.npc.incompatibleTemplateNames.includes(templateName) ||
          this.npc._templates.some(tn =>
            incompatibleNpcTemplates.includes(tn),
          )) &&
        this.npc.incompatibleList(templateName)
      );
    },
  },
  computed: {
    npcStats(): object {
      if (!this.npc) throw new Error('no npc');
      return this.npc.stats;
    },
    availableTemplates(): NPCTemplate[] {
      if (!this.npc) throw new Error('no npc');
      return _.difference(templates, this.npc.templates);
    },
    systemsAvailable(): NPCSystem.Any[] {
      if (!this.npc) throw new Error('no npc');
      const preSort = this.npc.optional_class_systems.filter(
        sys => !this.npc!.pickedSystems.includes(sys),
      );
      return _.orderBy(
        preSort,
        ['base', 'type', 'name'],
        ['desc', 'desc', 'asc'],
      );
    },
  },
  mounted() {
    this.$smoothReflow &&
      this.$smoothReflow({
        el: '.window, .pickercard, .card-body',
      });
  },
});
</script>

<style lang="scss" scoped>
.designer {
  width: 70%;
}
.flavor {
  font-size: 0.9em;
}
.stat-table-card .card-body {
  padding: 0;
}
.stat-table {
  margin-bottom: 0;
  tbody th {
    font-size: 1.3em !important;
  }
  thead th {
    border-bottom-width: 1px;
    border-top: none;
  }
  th {
    padding: 0.5em;
  }
  th:not(:last-child) {
    border-right: 1px #dee2e6 solid;
  }
}
.pickercard .card-header {
  padding: 5px 0;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 0.7em;
}
.pickercard .card-body {
  padding: 1.25em 0;
  min-height: 82px;
}
.dragdiv {
  display: flex;
  flex-wrap: wrap;
  padding: 0 1.25em;
  & > div {
    padding: 5px;
  }
}
.picker-divider {
  color: #5a5353;
  text-transform: uppercase;
  font-size: 0.7em;
  letter-spacing: 0.5em;
  font-style: italic;
  font-weight: bold;
  margin: 10px 0;
}
</style>
