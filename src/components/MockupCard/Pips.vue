<template>
  <div class="pips" :style="`max-width: calc(${breakAt * 18}px)`">
    <circle-icon style="font-size: 18px" v-for="i in count" :key="i" />
  </div>
</template>

<script>
import CircleIcon from 'vue-material-design-icons/CheckboxBlankCircleOutline.vue';

const breakAt = 8;

export default {
  components: { CircleIcon },
  data: () => ({ breakAt }),
  props: { count: { type: Number, required: true } },
};
</script>

<style>
.pips {
  line-height: 10px;
  text-align: left;
  letter-spacing: -1px;
}
</style>
