<template>
  <div class="syswrap">
    <div @click="showModal" class="sys d-flex flex-column justify-content-center">
      <div class="d-flex align-items-center justify-content-between" style="height: 24px;">
        <h6 :class="`text-system--${system.type}`">
          {{ systemIsShort || system.type === 'weapon' ? shorten(system.name) : system.name }}
        </h6>
        <div v-if="system.action">
          {{ actionName(system.action) }}
        </div>
          <recharge v-if="system.recharge" :value="system.recharge" />
        <div
          class="d-flex align-items-center"
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
          class="d-flex d-row align-items-center"
          style="max-width: 60%; white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis;"
          v-else-if="systemIsShort"
        >
          {{ system.effect_short || system.effect }}
        </div>
      </div>
      <div
        class="d-flex d-row align-items-center mt-1"
        style="white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis;"
        v-if="(!systemIsShort || system.type === 'weapon') && system.effect"
      >
        {{ system.effect_short || system.effect }}
      </div>
      <div v-if="system.tags && system.tags.length" style="font-size: 1.2em;">
        <b-badge v-for="tag in system.tags" :key="tag.id" class="mr-1 py-1 text-align-center">{{ renderTag(tag, npc.tier) }}</b-badge>
      </div>
    </div>
    <b-modal
      centered
      class="system-modal"
      hide-header-close
      hide-header
      hide-footer
      ref="sysmodal"
    >
      <h5
        class="system-modal-title mb-0"
        :class="`text-system--${system.type}`"
      >
        {{ system.name }}
      </h5>
      <h6 class="system-modal-type my-1" :class="`text-system--${system.type}`">
        {{ system.type }}
        <template v-if="system.action">
          <!-- — {{ actionName(system.action) }} -->
        </template>
      </h6>
      <template v-if="system.type === 'weapon'">
        <dice-d20 class="d20 mr-1" />
        <div class="font-weight-bold">
          {{ rollString }}
        </div>
        <ArrowExpandHorizontal class="d20 ml-3 mr-1" />
        <div class="font-weight-bold">{{ rangeString }}</div>
        <Flare class="d20 ml-3 mr-1" />
        <div class="font-weight-bold">{{ damageString }}</div>
        <hr />
        <div class="font-weight-bold font-italic">
          {{ system.weapon_type.join(' ') }}
        </div>
        <div style="font-size: 0.7em" class="my-0">{{ system.tags }}</div>
        <div>
          <!-- {{ printRoll(system.weapon_roll, system.smart) }} -->
        </div>
        <div>
          <!-- {{ printRange(system.weapon_range) }} -->
        </div>
        <div v-if="system.damage">
          <!-- {{ printDamage(system.damage) }} -->
        </div>
      </template>
      <template v-else-if="system.tags || system.action">
        <hr />
        <div style="font-size: 0.8em" class="my-1">{{ system.tags }}</div>
      </template>
      <template v-if="system.effect">
        {{ system.effect }}
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import DiceD20 from 'vue-material-design-icons/DiceD20.vue';
import ArrowExpandHorizontal from 'vue-material-design-icons/ArrowExpandHorizontal.vue';
import Flare from 'vue-material-design-icons/Flare.vue';

import Recharge from './Recharge.vue';

import renderTag from '@/logic/rendertag';

export default Vue.extend({
  components: { Recharge, DiceD20, ArrowExpandHorizontal, Flare },
  props: {
    npc: { type: Object, required: true },
    system: { type: Object, required: true },
  },
  methods: {
    actionName: (s: string): string => {
      const map = {
        free: 'Free Action',
        quick: 'Quick Action',
        full: 'Full Action',
        protocol: 'Protocol',
        reaction: 'Reaction',
        quicktech: 'Quick Tech',
        fulltech: 'Full Tech',
      } as any;
      return map[s];
    },
    shorten(str: string) {
      const maxlength = this.system.type === 'weapon' ? 12 : 20;
      if (str.length < maxlength) {
        return str;
      } else {
        return str.replace(/[aeiou]/g, '').replace(/ /gi, '') + '';
      }
    },
    showModal() {
      (this.$refs.sysmodal as any).show();
    },
    renderTag
  },
  computed: {
    systemIsShort(): boolean {
      return !(this.system.action || this.system.tech_roll || this.system.recharge)
    },
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
  transition: background-color 0.2s ease;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.07);
  }
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
}
.syswrap:last-child .sys {
  border-bottom-width: 1px;
}
.d20 {
  font-size: 24px;
}
</style>
