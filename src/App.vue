<template>
  <div id="app">
    <!-- <h1>LANCER</h1> -->
    <b-container fluid id="main-zone">
      <b-row>
        <b-col>
          <b-card class="bg-light">
            <encounter-designer />
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import EncounterDesigner from './components/EncounterDesigner.vue';
import smoothReflow from 'vue-smooth-reflow';

import NPC from '@/logic/NPC.ts';

export default Vue.extend({
  mixins: [smoothReflow],
  name: 'app',
  components: { EncounterDesigner },
  mounted() {
    this.$smoothReflow &&
      this.$smoothReflow({
        el: '#main-zone',
      });
  },
});
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #48455a;
  margin-top: 60px;
}
#main-zone {
  width: 70%;
}
h1 {
  font-size: 'Arial';
  font-weight: bolder !important;
  font-style: italic;
  font-size: 4em;
  letter-spacing: 1em;
  margin-left: 1em;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
