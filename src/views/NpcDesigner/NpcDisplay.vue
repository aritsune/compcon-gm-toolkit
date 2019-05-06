<template>
    <v-card :color="`role--${npc.npcClass.role}`">
        <v-card-title class="white--text" :class="`role--${npc.npcClass.role}`">
            <div class="headline">
                {{ npc.name }}
            </div>
            <div class="headline ml-2">
                {{ npc.npcClass.name }}
            </div>
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

export default {
    computed: {
        npc() {
            return this.$store.state.npcDesigner.npcs[parseInt(this.$route.params.id)]
        }
    }
}
</script>

<style>

</style>
