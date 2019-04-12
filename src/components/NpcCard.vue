<template>
  <b-card class="npc-card mb-2" :class="`border-role--${npc.class.role}`">
    <b-container fluid>
      <b-row class="align-items-center">
        <b-col
          class="flex-grow-0 px-3 py-2 text-white npc-card-shrunk-title d-flex align-items-center"
          :class="`bg-role--${npc.class.role}`"
        >
          <b-button
            size="sm"
            variant="outline-light"
            style="pointer-events: none;"
            class="mr-2"
          >
            {{ 'I'.repeat(npc.tier) }}</b-button
          >
          <div>
            {{ npc.class.name }}
          </div>
        </b-col>
        <b-col
          class="text-nowrap py-1 font-weight-bolder d-flex npc-card-systemlist"
        >
          <system-button
            v-for="system in npc.systems"
            :key="system.name"
            :system="system"
            class="mr-2"
          />
        </b-col>
        <!-- <b-col class="ml-auto mr-1 px-0 flex-grow-0">
          <b-button size="sm" class="my-auto" style="line-height: 22px;">
            <pencil-icon style="font-size: 15px;" />
          </b-button>
        </b-col>
        <b-col class="mr-2 px-0 flex-grow-0">
          <b-button
            variant="danger"
            size="sm"
            class="my-auto"
            style="line-height: 22px;"
          >
            <delete-icon style="font-size: 16px;" />
          </b-button>
        </b-col> -->
      </b-row>
    </b-container>
  </b-card>
</template>

<script>
// import PencilIcon from 'vue-material-design-icons/Pencil.vue';
// import DeleteIcon from 'vue-material-design-icons/Delete.vue';
import SystemButton from './SystemButton';

export default {
  name: 'npc-card',
  components: { SystemButton },
  props: {
    npc: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.npc-card {
  .card-body {
    padding: 0;
  }
}
.npc-card-shrunk-title {
  text-transform: uppercase;
  letter-spacing: 0.15em;
}
.btn-static {
  background-color: white;
  border: 1px solid lightgrey;
  cursor: default;
}
.btn-static:active {
  -moz-box-shadow: inset 0 0 0px white;
  -webkit-box-shadow: inset 0 0 0px white;
  box-shadow: inset 0 0 0px white;
}
.npc-card-systemlist {
  overflow-x: hidden;
}
</style>
