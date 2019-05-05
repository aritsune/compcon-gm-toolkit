<template>
  <b-card
    class="npc-card mb-2"
    :class="`border-role--${npc.npcClass.role}`"
    :style="{ 'border-bottom-style': expanded ? 'solid' : 'none' }"
  >
    <b-container fluid>
      <b-row class="align-items-center d-flex">
        <b-col
          cols="2"
          class="px-3 py-2 text-white npc-card-shrunk-title d-flex align-items-center"
          :class="`bg-role--${npc.npcClass.role}`"
        >
          <b-button
            size="sm"
            variant="outline-light"
            style="pointer-events: none; width: 35px; padding: 0; font-size: 24px;"
          >
            <numeric1-icon v-if="npc.tier === 0" />
            <numeric2-icon v-else-if="npc.tier === 1" />
            <numeric3-icon v-else-if="npc.tier === 2" />
          </b-button>
          <div class="mx-auto">
            {{
              `${npc.templates.map(t => t.name).join(' ')} ${npc.npcClass.name}`
            }}
          </div>
        </b-col>
        <b-col
          class="text-nowrap py-1 font-weight-bolder d-flex npc-card-systemlist"
        >
          <system-badge
            v-for="system in npc.systems"
            :key="system.name"
            :system="system"
            class="mr-2"
          />
        </b-col>
        <b-button
          size="sm"
          variant="outline-secondary"
          @click="$emit('edit', npc)"
        >
          <pencil-icon style="font-size: 16px" />
        </b-button>
        <b-button
          class="ml-2"
          size="sm"
          variant="outline-secondary"
          @click="confirmDelete"
        >
          <delete-icon style="font-size: 16px" />
        </b-button>
        <b-button
          size="sm"
          class="ml-2 mr-3 chevronholder"
          variant="outline-secondary"
          @click="expanded = !expanded"
        >
          <menu-down-icon class="chevron" :class="{ chevronspun: expanded }" />
        </b-button>
      </b-row>
      <transition name="fade">
        <b-row
          :style="{
            height: expanded ? '120px' : 0,
            'border-top': expanded ? '1px solid' : '1px solid',
            'border-color': expanded ? 'inherit' : 'transparent',
          }"
          style="overflow: hidden;"
          :class="`border-role--${npc.npcClass.role}`"
          class="npc-extra-info"
        >
          <b-container fluid>
            <b-row>
              <b-col>
                <npc-stat-table :statblock="npc.stats" />
              </b-col>
            </b-row>
          </b-container>
        </b-row>
      </transition>
    </b-container>
    <b-modal ref="delete-modal" title="Delete NPC?" @ok="$emit('delete')">
      <div class="d-block text-center">
        <h3>Are you sure?</h3>
      </div>
      <!-- <b-button class="mt-3" block @click="$emit('delete')">Close Me</b-button> -->
    </b-modal>
  </b-card>
</template>

<script lang="ts">
import MenuDownIcon from 'vue-material-design-icons/MenuDown.vue';
import DeleteIcon from 'vue-material-design-icons/Delete.vue';
import PencilIcon from 'vue-material-design-icons/Pencil.vue';

import Numeric1Icon from 'vue-material-design-icons/Numeric1.vue';
import Numeric2Icon from 'vue-material-design-icons/Numeric2.vue';
import Numeric3Icon from 'vue-material-design-icons/Numeric3.vue';

import SystemBadge from './Badges/SystemBadge.vue';
import NpcStatTable from './NpcStatTable.vue';

import NPCClass, { NPCStatBlock } from '@/logic/interfaces/NPCClass';
import { NPCSystem } from '@/logic/interfaces/NPCSystem';
import NPC from '@/logic/NPC.ts';

import smoothReflow from 'vue-smooth-reflow';

export default {
  mixins: [smoothReflow],
  name: 'npc-card',
  components: {
    Numeric1Icon,
    Numeric2Icon,
    Numeric3Icon,
    SystemBadge,
    NpcStatTable,
    MenuDownIcon,
    DeleteIcon,
    PencilIcon,
  },
  data: () => ({
    expanded: false,
  }),
  props: {
    npc: {
      type: NPC,
      required: true,
    },
  },
  methods: {
    confirmDelete() {
      const vm = this as any;
      vm.$refs['delete-modal'].show();
    },
  },
  mounted() {
    // (this as any).$smoothReflow({
    //   el: '.window, .pickercard, .card-body',
    //   transition: '.5s height cubic-bezier(0.23, 1, 0.32, 1)',
    // });
  },
};
</script>

<style lang="scss" scoped>
.npc-card {
  .card-body {
    padding: 0;
  }
  overflow: hidden;
}
.npc-card-shrunk-title {
  text-transform: uppercase;
  letter-spacing: 0.15em;
}
.btn-static {
  background-color: white;
  border: 1px solid lightgrey;
  cursor: default;
}
.btn-static:active {
  -moz-box-shadow: inset 0 0 0px white;
  -webkit-box-shadow: inset 0 0 0px white;
  box-shadow: inset 0 0 0px white;
}
.npc-card-systemlist {
  overflow-x: hidden;
}
.chevronholder {
  height: 32px;
  width: 34px;
}
.chevron {
  font-size: 19px;
  margin-right: 2px;
  // line-height: 40px;
  // margin-top: 3px;
}
.npc-extra-info {
  transition: 0.5s height cubic-bezier(0.23, 1, 0.32, 1);
}
</style>

<style>
.chevron svg {
  transition: transform 250ms ease;
  transform: rotate(90deg);
  bottom: -2px;
  right: 1px;
}
.chevron.chevronspun svg {
  transform: rotate(0deg);
}
</style>
