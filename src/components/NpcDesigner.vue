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
            :variant="npc.tier === 0 ? 'primary' : 'outline-primary'"
            @click="npc.tier = 0"
            >1</b-button
          >
          <b-button
            :active="npc.tier === 1"
            :variant="npc.tier === 1 ? 'primary' : 'outline-primary'"
            @click="npc.tier = 1"
            >2</b-button
          >
          <b-button
            :active="npc.tier === 2"
            :variant="npc.tier === 2 ? 'primary' : 'outline-primary'"
            @click="npc.tier = 2"
            >3</b-button
          >
        </b-button-group>
        <div class="text-uppercase font-weight-bold mb-1">Stats</div>
        <b-card class="stat-table-card mx-auto my-3" style="width: 80%">
          <table class="table stat-table">
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
              </tr>
            </thead>
            <tbody>
              <tr>
                <th
                  v-for="(value, i) in Object.values(npcStats)"
                  :key="i + '--' + value"
                >
                  <transition name="fade" mode="out-in">
                    <div :key="i + '--' + value">
                      {{ value }}
                    </div>
                  </transition>
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
                <draggable
                  class="dragdiv systems-picked"
                  v-model="systemsPicked"
                  :group="{
                    name: 'systems',
                    pull: false,
                  }"
                  :sortable="false"
                  filter=".systems-picked"
                  @end="sortSystems"
                  @change="sortSystems()"
                  ghost-class="d-none"
                >
                  <system-button
                    v-for="(system, i) in systemsPicked"
                    :key="system.name"
                    :system="system"
                    :closable="!system.base"
                    @closed="removeSystem(i)"
                  />
                </draggable>
              </b-card>
            </b-col>
            <b-col cols="6">
              <b-card
                bg-variant="light"
                header="available systems"
                class="pickercard"
              >
                <draggable
                  class="dragdiv"
                  v-model="systemsAvailable"
                  group="systems"
                  @end="sortSystems"
                  @change="sortSystems"
                  ghost-class="d-none"
                >
                  <system-button
                    v-for="system in systemsAvailable"
                    :key="system.name"
                    :system="system"
                  />
                </draggable>
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
    <div>
      <pre>
          {{ npc && npc.systems.map(s => s.name) }}
      </pre>
    </div>
  </b-container>
</template>

<script lang="ts">
import Vue from 'vue';
import _ from 'lodash';
import NpcClassPicker from './NpcClassPicker.vue';
import NpcClassDisplay from './NpcClassDisplay.vue';
import SystemButton from './SystemButton.vue';
import CheckCircleIcon from 'vue-material-design-icons/CheckCircle.vue';
import draggable from 'vuedraggable';
import smoothReflow from 'vue-smooth-reflow';

import NPCClass, { NPCStatBlock } from '@/logic/interfaces/NPCClass';
import { NPCSystem } from '@/logic/interfaces/NPCSystem';
import NPC from '@/logic/NPC.ts';

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
    draggable,
    SystemButton,
    CheckCircleIcon,
  },
  data() {
    return {
      state: 'picking-class',
      selectedClass: null as NPCClass | null,
      npc: (null as unknown) as NPC,
      systemsPicked: [] as NPCSystem.Any[],
      systemsAvailable: [] as NPCSystem.Any[],
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
      console.log(this.selectedClass);
      this.systemsPicked = _.clone(this.npc.base_class_systems);
      this.systemsAvailable = _.clone(this.npc.optionalSystems);
      this.sortSystems();
      this.state = 'customizing';
    },
    sortSystems() {
      this.systemsPicked = _.orderBy(
        this.systemsPicked,
        ['is_base', 'type', 'name'],
        ['asc', 'desc', 'asc'],
      );
      this.systemsAvailable = _.orderBy(
        this.systemsAvailable,
        ['is_base', 'type', 'name'],
        ['asc', 'desc', 'asc'],
      );
    },
    removeSystem(i: number) {
      const sys = _.pullAt(this.systemsPicked, i)[0];
      console.log(sys);
      this.systemsAvailable.push(sys);
      this.sortSystems();
    },
  },
  computed: {
    npcStats(): NPCStatBlock {
      return this.npc.stats;
    },
  },
  mounted() {
    this.$smoothReflow &&
      this.$smoothReflow({
        el: '.window, .pickercard, .card-body',
      });
  },
  watch: {
    systemsPicked() {
      this.npc.optionalSystems = this.systemsPicked.filter(s => s && !s.base);
    },
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
  padding: 0;
}
.dragdiv {
  display: flex;
  flex-wrap: wrap;
  padding: 1.25em;
  & > div {
    padding: 5px;
  }
}
</style>
