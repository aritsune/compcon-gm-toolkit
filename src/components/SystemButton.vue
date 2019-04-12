<template>
  <div>
    <b-button
      size="small"
      :variant="`outline-system--${system.type}`"
      :id="system.name"
      class="system-btn"
      @click="showModal"
    >
      {{ system.name }}
      <span @click.stop="$emit('closed')">
        <close-circle-icon v-if="closable" style="font-size: 13px;" />
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
      <h5
        class="system-modal-title mb-0"
        :class="`text-system--${system.type}`"
      >
        {{ system.name }}
      </h5>
      <h6 class="system-modal-type my-1" :class="`text-system--${system.type}`">
        {{ system.type }}
      </h6>
      <template v-if="system.type === 'weapon'">
        <hr />
        <div class="font-weight-bold font-italic">{{ system.weapon_type }}</div>
        <div style="font-size: 0.7em" class="my-0">{{ system.tags }}</div>
        <div>
          <dice-multiple-icon
            style="font-size: 24px; vertical-align: text-bottom;"
          />
          {{ printRoll(system.weapon_roll) }}
        </div>
        <div>
          <vector-line-icon
            style="font-size: 24px; vertical-align: text-bottom;"
          />
          {{ system.range }}
        </div>
        <div>
          <flare-icon style="font-size: 24px; vertical-align: text-bottom;" />
          {{ system.damage.join('/') }} {{ system.damage_type }} damage
        </div>
      </template>
      <template v-if="system.effect">
        <hr />
        {{ system.effect }}
      </template>
    </b-modal>
  </div>
</template>

<script>
import DiceMultipleIcon from 'vue-material-design-icons/DiceMultiple.vue';
import VectorLineIcon from 'vue-material-design-icons/VectorLine.vue';
import FlareIcon from 'vue-material-design-icons/Flare.vue';
import CloseCircleIcon from 'vue-material-design-icons/CloseCircle.vue';

export default {
  name: 'system-button',
  components: { DiceMultipleIcon, VectorLineIcon, FlareIcon, CloseCircleIcon },
  props: {
    system: Object,
    closable: { type: Boolean, default: false },
  },
  methods: {
    showModal() {
      this.$refs.sysmodal.show();
    },
    printRoll(rollObj) {
      const { flat, accdiff } = rollObj;
      let output = '';
      if (flat) {
        if (flat.val > -1) output += '+';
        output += flat.val;
      } else {
        output += '0';
      }
      output += ' vs evasion';
      if (flat && flat.pertier) {
        output += '/tier';
      }
      if (accdiff) {
        const word = accdiff.val > -1 ? 'Accuracy' : 'Difficulty';
        output += ` with +${accdiff.val} ${word}`;
        if (accdiff.pertier) {
          output += '/tier';
        }
      }
      return output;
    },
    piss: () => alert('piss'),
  },
};
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
