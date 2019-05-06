<template>
    <v-card>
        <v-card-title class="primary white--text">
            <span class="headline">
                {{ npc.name }}
            </span>
        </v-card-title>
        <v-container fluid>
            <v-layout justify-space-between px-2>
                <v-flex shrink>
                    <v-layout column align-start>
                        <h6 class="title mr-2">HP</h6>
                        <pip-bar :max="npc.stats.hp" />
                    </v-layout>
                </v-flex>
                <v-flex shrink>
                    <v-layout column align-start>
                        <h6 class="title mr-2">HEAT</h6>
                        <pip-bar :max="npc.stats.heatcap" />
                    </v-layout>
                </v-flex>
                <v-flex shrink v-if="npc.stats.structure > 1">
                    <v-layout column align-start>
                        <h6 class="title mr-2">STRUCT</h6>
                        <pip-bar :max="npc.stats.structure" />
                    </v-layout>
                </v-flex>
                <v-flex shrink v-if="npc.stats.stress > 1">
                    <v-layout column align-start>
                        <h6 class="title mr-2">HP</h6>
                        <pip-bar :max="npc.stats.stress" />
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
</template>

<script>
import NPC from '@/logic/NPC';
import PipBar from '@/components/NpcCard/PipBar.vue'

export default {
    components: { PipBar },
    computed: {
        npc() {
            return this.$store.state.npcDesigner.npcs[parseInt(this.$route.params.id)]
        }
    }
}
</script>

<style>

</style>
