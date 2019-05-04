<template>
  <div class="sys d-flex d-row align-items-center justify-content-between">
    <h6 :class="`text-system--${system.type}`">
      {{ shorten(system.name) }}
    </h6>
    <div
      class="d-flex d-row align-items-center"
      v-if="system.type === 'weapon'"
    >
      <dice-d20 class="d20 mr-1" />
      <div class="font-weight-bold">
        {{ rollString }}
      </div>
      <ArrowExpandHorizontal class="d20 ml-3 mr-1" />
      <div class="font-weight-bold">{{ rangeString }}</div>
      <Flare class="d20 ml-3 mr-1" />
      <div class="font-weight-bold">{{ damageString }}</div>
    </div>
    <div
      v-else
      class="d-flex d-row align-items-center"
      style="max-width: 60%; white-space: nowrap; overflow-x: hidden;"
    >
      {{ system.effect_short || system.effect }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import DiceD20 from 'vue-material-design-icons/DiceD20.vue';
import ArrowExpandHorizontal from 'vue-material-design-icons/ArrowExpandHorizontal.vue';
import Flare from 'vue-material-design-icons/Flare.vue';

export default Vue.extend({
  components: { DiceD20, ArrowExpandHorizontal, Flare },
  props: {
    npc: { type: Object, required: true },
    system: { type: Object, required: true },
  },
  methods: {
    shorten(str: string) {
      const maxlength = this.system.type === 'weapon' ? 12 : 20;
      if (str.length < maxlength) {
        return str;
      } else {
        return str.replace(/[aeiou]/g, '').replace(/ /gi, '') + '';
      }
    },
  },
  computed: {
    rollString(): string {
      if (this.system.type !== 'weapon') return '';
      const { flat, accdiff } = this.system.weapon_roll;
      const { tier } = this.npc;
      let output = '';
      const flatTotal = flat
        ? flat.pertier
          ? flat.val * (tier + 1)
          : flat.val
        : 0;
      if (flatTotal) {
        if (flatTotal > -1) output += '+';
        output += flatTotal;
      }
      if (accdiff) {
        output += `+${Math.abs(accdiff.val) *
          (accdiff.pertier ? tier + 1 : 1)}d6`;
      }
      output += ' vs ';
      output += this.system.smart ? 'ED' : 'EV';
      return output;
    },
    rangeString(): string {
      if (this.system.type !== 'weapon') return '';
      const map: { [key: string]: string } = {
        range: 'RNG',
        threat: 'THR',
        blast: 'BLA',
        burst: 'BUR',
        cone: 'CON',
      };
      const { weapon_range: ranges } = this.system;
      return ranges
        .map((range: any) => {
          return `${map[range.type]} ${range.val}`;
        })
        .join(', ');
    },
    damageString(): string {
      if (this.system.type !== 'weapon') return '';
      const map: { [key: string]: string } = {
        kinetic: 'KIN',
        explosive: 'EXP',
        energy: 'NRG',
        burn: 'BRN',
        heat: 'HEA',
      };
      const { damage: damages } = this.system;
      return damages
        .map((damage: any) => {
          const damageAmount =
            damage.val[Math.min(this.npc.tier, damage.val.length - 1)];
          return `${damageAmount} ${map[damage.type]}`;
        })
        .join(', ');
    },
  },
});
</script>

<style lang="scss">
.sys {
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: rgba(0, 0, 0, 0.05);
  border-width: 1px 0 0 0;
  margin: 0;
  padding: 0.8em 1.2em;
  font-size: 0.7em;
  width: 100%;
  text-align: left;
  min-height: 43px;
  h6 {
    font-weight: bold;
    margin: 0;
    font-size: 1.2em;
    font-variant: small-caps;
  }
  &:last-child {
    border-bottom-width: 1px;
  }
}
.d20 {
  font-size: 24px;
}
</style>
