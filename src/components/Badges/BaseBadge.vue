<template>
  <div>
    <b-button
      size="small"
      :variant="`outline-${variant}`"
      :id="id"
      class="sysbadge d-flex"
      @click="showModal"
      style="padding-top: 0; padding-bottom: 0"
      :style="{
        paddingRight: closable || addable ? 0 : null,
        opacity: disabled ? 0.7 : 1,
        'pointer-events': disabled ? 'none' : null,
      }"
      :class="{ disabled }"
    >
      <div style="height: 30px; line-height: 30px">
        <slot name="button" />
      </div>
      <div
        style="height: 30px; line-height: 30px; padding-left: 7px; padding-right: 7px; margin-left: 7px;"
        @click.stop="emitEvent"
        class="buttonwrapper"
        v-if="closable || addable"
        :class="`border-${variant}`"
      >
        <span v-if="disabled">
          <circle-icon class="badgebutton" />
        </span>
        <template v-else>
          <span v-if="closable">
            <close-circle-icon class="badgebutton" />
          </span>
          <span v-else-if="addable">
            <plus-circle-icon class="badgebutton" />
          </span>
        </template>
      </div>
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
import CircleIcon from 'vue-material-design-icons/Circle.vue';

import { NPCSystem } from '@/logic/interfaces/NPCSystem';

export default Vue.extend({
  name: 'system-button',
  components: { CloseCircleIcon, PlusCircleIcon, CircleIcon },
  props: {
    closable: { type: Boolean, default: false },
    addable: { type: Boolean, default: false },
    variant: { type: String, default: 'secondary' },
    disabled: { type: Boolean, default: false },
    id: { type: String },
  },
  methods: {
    showModal() {
      (this.$refs.sysmodal as any).show();
    },
    emitEvent() {
      if (this.closable) this.$emit('closed');
      else if (this.addable) this.$emit('added');
    },
  },
});
</script>

<style lang="scss">
.sysbadge {
  text-transform: uppercase;
  white-space: nowrap;
  font-size: 0.7em !important;
  padding: 0 0.75em;
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
.badgebutton {
  font-size: 13px;
  transition: opacity 200ms ease;
  &:hover {
    opacity: 0.8;
  }
}
.buttonwrapper {
  border-radius: 0 4px 4px 0;
  transition: all 200ms ease;
  border-left: 1px solid transparent;
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
}

.badgebutton:hover .buttonwrapper {
  border-color: white;
}

.disabled {
  opacity: 0.7;
  pointer-events: none;
}
</style>
