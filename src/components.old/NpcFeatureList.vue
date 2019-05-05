<template>
  <b-card class="text-align-center m-auto" style="width: 80%">
    <b-button v-b-toggle.collapser block :disabled="features.length < 1">
      {{ features.length || 'No' }} features</b-button
    >
    <b-collapse id="collapser">
      <b-card
        v-for="feature in features"
        :key="feature.name"
        :header="feature.name"
        class="my-2"
      >
        <p>{{ feature.description }}</p>
      </b-card>
    </b-collapse>
  </b-card>
</template>

<script>
export default {
  name: 'npc-feature-list',
  props: ['features'],
};
</script>

<style>
.card-header {
  font-weight: bold;
  padding: 0.4em 0;
}
.card-body {
  padding: 1em;
}
.card-body p {
  margin-bottom: 0;
}
</style>
