<template>
  <b-col :cols="4">
    <b-card
      :border-variant="`role--${npc.npcClass.role}`"
      no-body=""
      class="npc-card"
    >
      <b-card-header
        :header-bg-variant="`role--${npc.npcClass.role}`"
        header-text-variant="white"
        class="d-flex align-items-center justify-content-between"
        style="font-size: 1.2em; font-weight: normal; letter-spacing: 0.1em; line-height: initial; height: 40px;"
      >
        <div>
          {{ npc.npcClass.name.toUpperCase() }}
        </div>
        <div>TIER {{ npc.tier + 1 }}</div>
        <div v-if="editable" class="py-5">
          <b-button
            size="sm"
            variant="outline-light"
            @click="$emit('edit', npc)"
          >
            <pencil style="font-size: 16px;" />
          </b-button>
          <b-button
            size="sm"
            variant="outline-light"
            @click="$emit('duplicate')"
            class="ml-2"
          >
            <duplicate style="font-size: 16px;" />
          </b-button>
          <b-button
            size="sm"
            variant="outline-light"
            @click="confirmDelete"
            class="ml-2"
          >
            <delete style="font-size: 16px;" />
          </b-button>
        </div>
      </b-card-header>
      <b-card-body class="px-0 npc-card-body">
        <div class="d-flex align-items-center justify-content-between px-3">
          <pip-bar label="HP" :max="npc.stats.hp" :rollover="npc.stats.structure > 1" />
          <pip-bar label="HEAT" :max="npc.stats.heatcap" :rollover="npc.stats.stress > 1" />
        </div>
        <template v-if="npc.stats.structure > 1 || npc.stats.stress > 1">
          <hr />
          <div class="d-flex align-items-center justify-content-between px-3" 
          >
            <pip-bar label="STRUCT" :max="npc.stats.structure" />
            <pip-bar label="STRESS" :max="npc.stats.stress" />
          </div>
        </template>
        <hr />
        <div class="d-flex align-items-center justify-content-between px-3">
          <div class="label">EVADE</div>
          <div class="stat">{{ npc.stats.evade }}</div>

          <div class="label">EDEF</div>
          <div class="stat">{{ npc.stats.edef }}</div>

          <div class="label">ARMOR</div>
          <div class="stat">{{ npc.stats.armor }}</div>

          <div class="label">SPEED</div>
          <div class="stat">{{ npc.stats.speed }}</div>

          <div class="label">SENSE</div>
          <div class="stat">{{ npc.stats.sensor }}</div>
        </div>
        <div class="d-flex-column mt-3">
          <System
            v-for="(system, i) in shownSystems"
            :key="i"
            :system="system"
            :npc="npc"
          />
        </div>
        <div class="d-flex align-items-center justify-content-around px-3 mt-3">
          <div class="haselabel">H</div>
          <div class="stat">
            {{ npc.stats.hull > -1 ? '+' : '' }}{{ npc.stats.hull }}
          </div>

          <div class="haselabel">A</div>
          <div class="stat">
            {{ npc.stats.agility > -1 ? '+' : '' }}{{ npc.stats.agility }}
          </div>

          <div class="haselabel">S</div>
          <div class="stat">
            {{ npc.stats.systems > -1 ? '+' : '' }}{{ npc.stats.systems }}
          </div>

          <div class="haselabel">E</div>
          <div class="stat">
            {{ npc.stats.engineering > -1 ? '+' : ''
            }}{{ npc.stats.engineering }}
          </div>

          <div class="label">SAVE</div>
          <div class="stat">
            {{ npc.stats.save }}
          </div>
        </div>
      </b-card-body>
    </b-card>
    <b-modal ref="delete-modal" title="Delete NPC?" @ok="$emit('delete')">
      <div class="d-block text-center">
        <h3>Are you sure?</h3>
      </div>
      <!-- <b-button class="mt-3" block @click="$emit('delete')">Close Me</b-button> -->
    </b-modal>
  </b-col>
</template>

<script lang="ts">
import Vue from 'vue';

import PipBar from './PipBar.vue';
import System from './System.vue';

import Pencil from 'vue-material-design-icons/Pencil.vue';
import Duplicate from 'vue-material-design-icons/ContentCopy.vue';
import Delete from 'vue-material-design-icons/Delete.vue';

import NPC from '@/logic/NPC.ts';
import { NPCSystem } from '@/logic/interfaces/NPCSystem.ts';

import _ from 'lodash';

export default Vue.extend({
  name: 'mockup',
  props: {
    npc: { type: NPC, required: true },
    editable: { type: Boolean, default: false },
  },
  components: {
    PipBar,
    System,
    Pencil,
    Delete,
    Duplicate,
  },
  computed: {
    shownSystems(): NPCSystem.Any[] {
      return _.sortBy(
        this.npc.systems.filter(s => !s.hide_on_card),
        'type',
      ).reverse();
    },
  },
  methods: {
    confirmDelete() {
      const vm = this as any;
      vm.$refs['delete-modal'].show();
    },
  },
});
</script>

<style lang="scss">
.label {
  font-weight: bold;
  font-size: 0.7em;
}
.haselabel {
  font-weight: bold;
  font-size: 0.8em;
  color: gray;
}
.stat {
  font-weight: bold;
  font-size: 1.5em;
}
.npc-card-body .material-design-icon > .material-design-icon__svg {
  bottom: 0px !important;
}
</style>
