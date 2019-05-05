<template>
  <b-card
    :border-variant="`role--${selectedClass.role}`"
    :header-bg-variant="`role--${selectedClass.role}`"
    header-text-variant="white"
    :header="selectedClass.name.toUpperCase()"
  >
    <p class="font-italic text-muted flavor">
      {{ selectedClass.info.flavor }}
    </p>
    <hr />
    <h5>Tactics</h5>
    <p>
      {{ selectedClass.info.tactics }}
    </p>
    <b-container fluid class="w-auto py-2 d-inline-block align-items-center">
      <b-row>
        <b-col class="text-nowrap" style="line-height: 1.7em">
          <b>Base systems:</b>
        </b-col>
        <b-col v-for="system in baseSystems" :key="system.name" class="px-1">
          <system-badge :system="system" />
        </b-col>
      </b-row>
    </b-container>
    <b-container fluid class="w-auto py-2 d-inline-block align-items-center">
      <b-row>
        <b-col class="text-nowrap" style="line-height: 1.7em">
          <b>Optional systems:</b>
        </b-col>
        <b-col
          v-for="system in optionalSystems"
          :key="system.name"
          class="px-1"
        >
          <system-badge :system="system" />
        </b-col>
      </b-row>
    </b-container>

    <b-container fluid class="w-50 mt-3"
      ><b-row>
        <b-col>
          <b-button block variant="secondary" @click="$emit('cancel')"
            >Back</b-button
          >
        </b-col>
        <b-col class="pl-0">
          <b-button block variant="primary" @click="$emit('confirm')">
            Select
          </b-button>
        </b-col>
      </b-row></b-container
    >
  </b-card>
</template>

<script lang="ts">
import Vue from 'vue';
import SystemBadge from './Badges/SystemBadge.vue';
import { NPCSystem } from '@/logic/interfaces/NPCSystem';

const systems: NPCSystem.Any[] = require('../../static/systems.json');

export default Vue.extend({
  components: {
    SystemBadge,
  },
  props: {
    selectedClass: Object,
  },
  computed: {
    baseSystems(): NPCSystem.Any[] {
      return systems.filter(s => s.class === this.selectedClass.name && s.base);
    },
    optionalSystems(): NPCSystem.Any[] {
      return systems.filter(
        s => s.class === this.selectedClass.name && !s.base,
      );
    },
  },
});
</script>
