<template>
  <div>
    <transition name="fade" mode="out-in">
      <!-- Main view -->
      <div key="designer" v-if="state === 'designing'">
        <div v-for="(npc, i) in npcs" :key="i">
          <npc-card :npc="npc" />
        </div>
        <b-button
          size="sm"
          block
          variant="primary"
          @click="state = 'creating-npc'"
        >
          <plus-icon style="font-size: 24px;" />
        </b-button>
      </div>
      <!-- NPC designer -->
      <npc-designer
        key="npcdesigner"
        v-else-if="state === 'creating-npc'"
        @newnpc="onNewNPC"
      />
    </transition>
  </div>
</template>

<script>
import Vue from 'vue';
import NpcDesigner from './NpcDesigner.vue';
import NpcCard from './NpcCard.vue';

import NPCClass, { NPCStatBlock } from '@/logic/interfaces/NPCClass';
import { NPCSystem } from '@/logic/interfaces/NPCSystem';
import NPC from '@/logic/NPC.ts';

import PlusIcon from 'vue-material-design-icons/Plus.vue';

export default Vue.extend({
  name: 'encounter-designer',
  components: { NpcDesigner, NpcCard, PlusIcon },
  data: () => ({
    state: 'designing',
    npcs: [],
  }),
  props: {
    msg: String,
  },
  methods: {
    onNewNPC(npc) {
      this.npcs.push(npc);
      console.log(npc);
      this.state = 'designing';
    },
  },
});
</script>

<style scoped>
.generator {
  margin-top: 5em;
  width: 90%;
}
@media (min-width: 576px) {
  .generator {
    width: 70%;
  }
}
.col {
  padding: 0;
}
.output {
  width: 100%;
  min-height: 500px;
}
</style>
