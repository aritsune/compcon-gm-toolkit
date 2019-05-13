<template>
    <v-card class="primary--text">
        <v-tabs dark color="primary" slider-color="secondary">
            <v-tab>
                NPCs
            </v-tab>
            <v-tab>
                Graveyard
            </v-tab>
            <!-- NPCs -->
            <v-tab-item>
                <v-container fluid>
                    <draggable handle=".draghandle" @end="onChange">
                        <v-slide-y-transition
                            group
                            tag="div"
                            class="layout row wrap justify-start"
                        >
                            <v-flex
                                xs12
                                sm6
                                :class="calcSize(npc)"
                                v-for="npc in aliveNpcs"
                                :key="npc.id"
                            >
                                <runner-npc-card :npc="npc" />
                            </v-flex>
                        </v-slide-y-transition>
                    </draggable>
                </v-container>
            </v-tab-item>
            <!-- Graveyard -->
            <v-tab-item>
                <v-container fluid>
                    <v-slide-y-transition
                        group
                        tag="div"
                        class="layout row wrap justify-start grow-shrink-0"
                    >
                        <v-flex
                            xs12
                            sm6
                            md3
                            v-for="npc in destroyedNpcs"
                            :key="npc.id"
                        >
                            <v-card color="grey darken-2">
                                <v-card-title class="white--text title"
                                    >{{ npc.baseNPC.name }}
                                    <v-btn
                                        dark
                                        outline
                                        small
                                        color="white"
                                        class="ma-0 ml-2 px-2"
                                        style="min-width: 0;"
                                        title="Bring Back"
                                        @click="npc.destroyed = false"
                                        ><v-icon small>mdi-undo</v-icon></v-btn
                                    ></v-card-title
                                >
                            </v-card>
                        </v-flex>
                    </v-slide-y-transition>
                </v-container>
            </v-tab-item>
        </v-tabs>
    </v-card>
</template>

<script lang="ts">
import draggable from 'vuedraggable'
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import _ from 'lodash';
import ActiveEncounter, { ActiveNPC } from '../../logic/ActiveEncounter';
// components
import RunnerNpcCard from '@/components/EncounterRunner/RunnerNpcCard.vue'

@Component({
    components: { RunnerNpcCard, draggable }
})
export default class EncounterRunner extends Vue {
    @Prop(Object) preEnc!: ActiveEncounter;
    encounter = _.clone(this.preEnc);

    get allNpcs() {
        return this.encounter.npcs
    }

    get aliveNpcs() {
        return this.allNpcs.filter(n => !n.destroyed)
    }

    get destroyedNpcs() {
        return this.allNpcs.filter(n => n.destroyed)
    }

    @Watch('encounter', {deep: true})
    onEncounterChange(val: ActiveEncounter) {
        console.log('changed')
        this.$store.commit('encounterRunner/edit', val)
    }



    onChange({newIndex, oldIndex}: any) {
        const arr = _.clone(this.encounter.npcs)
        arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
        console.log(arr.map(a => a.baseNPC.name))
        this.encounter.npcs = [...arr];
    }

    calcSize({ baseNPC: npc }: ActiveNPC) {
        if (npc._templates.includes('ultra')) return 'md12';
        if (npc._templates.includes('elite')) return 'md6';
        return 'md3';
    }

}
</script>

<style>
.v-tabs__bar {
    border-radius: 0;
}
</style>
