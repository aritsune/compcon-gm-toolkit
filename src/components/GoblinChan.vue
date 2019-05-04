<template>
  <div class="goblinchan d-flex-column">
    <transition-group name="fade">
      <b class="goblinchan-header" v-if="tips.length" key="header"
        >GOBLIN-CHAN'S TIPS</b
      >
      <div class="popover bs-popover-top " v-for="(tip, i) in tips" :key="i">
        <div
          class="arrow"
          style="right: 90px;"
          v-if="i === tips.length - 1"
        ></div>
        <div class="tipbody">
          {{ tip }}
        </div>
      </div>
    </transition-group>
    <div>
      <img :src="image" alt="Goblin-chan" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import image from '../../static/goblinchan.png';

export default Vue.extend({
  name: 'goblin-chan',
  data: () => ({ image }),
  props: { tips: { type: Array, required: true } },
});
</script>

<style scoped>
.goblinchan img {
  width: 200px;
}
.goblinchan {
  position: fixed;
  bottom: 0px;
  right: 0px;
  margin-right: 60px;
  margin-bottom: 30px;
}
.popover {
  position: relative;
  width: 200px;
}
.tipbody {
  padding: 0.5rem 0.75rem;
}
.goblinchan-header {
  font-size: 0.7em;
  text-align: left;
  align-self: flex-start;
}
</style>
