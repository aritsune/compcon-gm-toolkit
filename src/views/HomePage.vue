<template>
    
</template>

<script lang="ts">
import Vue from 'vue';
// icons
import INpcDesigner from 'vue-material-design-icons/AccountEdit.vue'
import IEncounterDesigner from 'vue-material-design-icons/AccountMultiplePlus.vue'
import IEncounterRunner from 'vue-material-design-icons/AccountGroup.vue'
const icons = { INpcDesigner, IEncounterDesigner, IEncounterRunner }
//

export default Vue.extend({
    name: 'home-page',
    components: { ...icons }
})
</script>

<style>

</style>
