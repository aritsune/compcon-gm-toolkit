<template>
  <div>
    <b-card class="stat-table-card mx-auto my-3" style="width: 80%">
      <table class="table stat-table" style="table-layout: fixed">
        <thead class="text-uppercase bg-light" style="font-size: 0.7em;">
          <tr>
            <th>HP</th>
            <th>EVADE</th>
            <th>EDEF</th>
            <th>HEAT</th>
            <th>H</th>
            <th>A</th>
            <th>S</th>
            <th>E</th>
            <th>ARMOR</th>
            <th>SPD</th>
            <th>SENSE</th>
            <th>SAVE</th>
            <th>STRUCT</th>
            <th>STRESS</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th
              v-for="(value, i) in Object.values(statblock)"
              :key="i + '--' + value"
            >
              <div>
                {{ value }}
              </div>
            </th>
          </tr>
        </tbody>
      </table>
    </b-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'npc-stat-table',
  props: {
    statblock: { type: Object, required: true },
  },
});
</script>

<style lang="scss" scoped>
.stat-table-card .card-body {
  padding: 0;
}
.stat-table {
  margin-bottom: 0;
  tbody th {
    font-size: 1.3em !important;
  }
  thead th {
    border-bottom-width: 1px;
    border-top: none;
  }
  th {
    padding: 0.5em;
  }
  th:not(:last-child) {
    border-right: 1px #dee2e6 solid;
  }
}
</style>
