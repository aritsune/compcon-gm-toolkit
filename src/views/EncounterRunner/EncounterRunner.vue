<template>
    <v-container fluid>
        <draggable
            v-model="encounter.npcs"
            handle=".npccardtitle"
            class="layout wrap"
            filter=".v-card"
        >
            <v-flex xs12 sm6 md4 v-for="(npc, i) in encounter.npcs" :key="i">
                <runner-npc-card :npc="npc" />
            </v-flex>
        </draggable>
    </v-container>
</template>

<script lang="ts">
import draggable from 'vuedraggable'
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import _ from 'lodash';
import ActiveEncounter from '../../logic/ActiveEncounter';
// components
import RunnerNpcCard from '@/components/EncounterRunner/RunnerNpcCard.vue'

@Component({
    components: { RunnerNpcCard, draggable }
})
export default class EncounterRunner extends Vue {
    @Prop(Object) preEnc!: ActiveEncounter;
    encounter = _.clone(this.preEnc);

    @Watch('encounter', {deep: true})
    onEncounterChange(val: ActiveEncounter) {
        console.log('changed')
        this.$store.commit('encounterRunner/edit', val)
    }

}
</script>