<template>
  <base-badge
    :id="tmp.name"
    v-bind="$props"
    @closed="$emit('closed')"
    @added="$emit('added')"
  >
    <template v-slot:button>
      {{ tmp.name }}
    </template>

    <template v-slot:modal>
      <h5 class="system-modal-title mb-0 text-secondary">
        {{ tmp.name }}
      </h5>
    </template>
  </base-badge>
</template>

<script lang="ts">
import Vue from 'vue';

import BaseBadge from './BaseBadge.vue';

import { NPCSystem } from '@/logic/interfaces/NPCSystem';

export default Vue.extend({
  name: 'system-button',
  components: { BaseBadge },
  props: {
    tmp: { type: Object, required: true },
    closable: { type: Boolean, default: false },
    addable: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },
});
</script>

<style>
.system-btn {
  text-transform: uppercase;
  white-space: nowrap;
  font-size: 0.7em !important;
}
.modal-header {
  border-top-left-radius: 4px !important;
  border-top-right-radius: 4px !important;
}
.system-modal-title {
  text-transform: uppercase;
  letter-spacing: 0.15em;
}
h6.system-modal-type {
  font-size: 0.7em;
  font-style: italic;
  text-transform: uppercase;
  letter-spacing: 0.5em;
}
.system-modal {
  white-space: initial;
}
</style>
