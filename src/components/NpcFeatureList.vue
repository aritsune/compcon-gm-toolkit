<template>
  <div class="text-align-center m-auto" style="width: 80%">
    <b-button v-b-toggle.collapser block :disabled="features.length < 1">
      {{ features.length || 'No' }} features</b-button
    >
    <b-collapse id="collapser">
      <b-card v-for="feature in features" :key="feature.name" class="my-2">
        <p class="font-weight-bold">{{ feature.name }}</p>
        <p>{{ feature.description }}</p>
      </b-card>
    </b-collapse>
  </div>
</template>

<script>
export default {
  name: 'npc-feature-list',
  props: ['features'],
};
</script>

<style></style>
