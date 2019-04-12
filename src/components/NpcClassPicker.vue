<template>
  <div>
    <fragment v-for="role in Object.keys(classesByRole)" :key="role">
      <b-row class="justify-content-center px-2 my-2">
        <b-col class="role-header">
          <span>{{ role }}</span>
        </b-col>
      </b-row>
      <b-row class="justify-content-center">
        <b-col
          cols="3"
          v-for="(npcClass, index) in classesByRole[role]"
          :key="index"
          class="mb-2 px-2"
        >
          <b-button
            block
            class="class-card py-2"
            :variant="`outline-role--${npcClass.role}`"
            :value="npcClass.name"
            @click="$emit('pick', classesByRole[role][index])"
          >
            {{ npcClass.name }}
          </b-button>
        </b-col>
      </b-row>
    </fragment>
  </div>
</template>

<script>
import Vue from 'vue';
import _ from 'lodash';

export default Vue.extend({
  name: 'npc-class-picker',
  data() {
    return {
      state: 'picking-class',
      npcClasses: require('../../static/classes.json'),
    };
  },
  computed: {
    classesByRole() {
      return _.groupBy(this.npcClasses, 'role');
    },
    selectedClass() {
      if (!this.selectedClassName) return undefined;
      return this.npcClasses.find(c => c.name === this.selectedClassName);
    },
  },
});
</script>

<style scoped>
.class-card {
  text-transform: uppercase;
  letter-spacing: 0.2em;
}
.role-header {
  width: 100%;
  text-align: center;
  border-bottom: 1px solid #6f6c6c;
  line-height: 0.1em;
  margin: 10px 0 20px;
}

.role-header span {
  color: #6f6c6c;
  font-size: 0.8em;
  text-transform: uppercase;
  font-style: italic;
  letter-spacing: 0.2em;
  background: #f8f9fa !important;
  padding: 0 10px;
}
</style>
