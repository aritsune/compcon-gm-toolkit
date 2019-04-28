<template>
  <div>
    <b-button
      size="small"
      :variant="variant"
      :id="id"
      class="sysbadge"
      @click="showModal"
    >
      <slot name="button" />
      <span v-if="closable" @click.stop="$emit('closed')">
        <close-circle-icon style="font-size: 13px;" />
      </span>
      <span v-else-if="addable" @click.stop="$emit('added')">
        <plus-circle-icon style="font-size: 13px;" />
      </span>
    </b-button>

    <b-modal
      centered
      ref="sysmodal"
      class="system-modal"
      hide-header-close
      hide-header
      hide-footer
    >
      <slot name="modal" />
    </b-modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import CloseCircleIcon from 'vue-material-design-icons/CloseCircle.vue';
import PlusCircleIcon from 'vue-material-design-icons/PlusCircle.vue';

import { NPCSystem } from '@/logic/interfaces/NPCSystem';

export default Vue.extend({
  name: 'system-button',
  components: { CloseCircleIcon, PlusCircleIcon },
  props: {
    closable: { type: Boolean, default: false },
    addable: { type: Boolean, default: false },
    variant: { type: String, default: 'outline-secondary' },
    id: { type: String },
  },
  methods: {
    showModal() {
      (this.$refs.sysmodal as any).show();
    },
  },
});
</script>

<style>
.sysbadge {
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
