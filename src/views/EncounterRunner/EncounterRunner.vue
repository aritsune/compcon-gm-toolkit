<template>
    <v-container fluid>
        <v-layout wrap>
            <v-flex xs12 sm6 md4 v-for="(npc, i) in encounter.npcs" :key="i">
                <runner-npc-card :npc="npc" />
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import _ from 'lodash';
import ActiveEncounter from '../../logic/ActiveEncounter';
// components
import RunnerNpcCard from '@/components/EncounterRunner/RunnerNpcCard.vue'

@Component({
    components: { RunnerNpcCard }
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