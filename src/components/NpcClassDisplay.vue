<template>
  <b-card
    :border-variant="`role--${selectedClass.role}`"
    :header-bg-variant="`role--${selectedClass.role}`"
    header-text-variant="white"
    :header="selectedClass.name.toUpperCase()"
  >
    <p class="font-italic text-muted flavor">
      {{ selectedClass.info.flavor }}
    </p>
    <hr />
    <h5>Tactics</h5>
    <p>
      {{ selectedClass.info.tactics }}
    </p>
    <b-container
      fluid
      class="w-auto py-2 d-inline-block align-items-center"
      v-for="systemCategory in ['base', 'optional']"
      :key="systemCategory"
    >
      <b-row>
        <b-col class="text-nowrap" style="line-height: 1.7em">
          <b>{{ systemCategory }} systems:</b>
        </b-col>
        <b-col
          v-for="system in selectedClass.systems[systemCategory]"
          :key="system.name"
          class="px-1"
        >
          <system-button :system="system" />
        </b-col>
      </b-row>
    </b-container>

    <b-container fluid class="w-50 mt-3"
      ><b-row>
        <b-col>
          <b-button block variant="secondary" @click="$emit('cancel')"
            >Back</b-button
          >
        </b-col>
        <b-col class="pl-0">
          <b-button block variant="primary" @click="$emit('confirm')">
            Select
          </b-button>
        </b-col>
      </b-row></b-container
    >
  </b-card>
</template>

<script>
import SystemButton from './SystemButton';

export default {
  components: {
    SystemButton,
  },
  props: {
    selectedClass: Object,
  },
};
</script>
