<template>
    <div>
        <v-layout align-center>
            <h3 class="headline text-xs-left ml-2 grey--text text--darken-1">
                NPCs
            </h3>
            <v-flex ml-auto style="padding: 7px; flex-grow: 0;">
                <add-button text="Create NPC" />
            </v-flex>
        </v-layout>
        <v-divider class="mb-3" />
        <v-layout justify-start class="file-list" wrap>
            <v-flex v-for="(npc, i) in npcs" :key="i" xs12 sm6 md3 xl2>
                <File
                    :name="npc.name"
                    icon="mdi-account"
                    more
                    :to="`/npc/${i}`"
                >
                    <template v-slot:extra-icons>
                        <v-menu bottom right @click.stop="">
                            <template v-slot:activator="{ on }">
                                <v-icon
                                    right
                                    class="ml-auto more-icon"
                                    v-on="on"
                                >
                                    mdi-dots-vertical
                                </v-icon>
                            </template>

                            <v-list class="more-list">
                                <v-list-tile v-ripple @click="() => null">
                                    <v-list-tile-title>Edit</v-list-tile-title>
                                </v-list-tile>
                                <v-list-tile v-ripple @click="() => null">
                                    <v-list-tile-title
                                        >Delete</v-list-tile-title
                                    >
                                </v-list-tile>
                            </v-list>
                        </v-menu>
                    </template>
                </File>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
// components
import File from "@/components/File.vue";
import AddButton from "@/components/AddButton.vue";
// vuex
import { mapState } from 'vuex';

export default {
    name: 'npc-designer-list',
    components: { File, AddButton },
    computed: mapState('npcDesigner', ['npcs'])
}
</script>

<style>
.file-list > .flex {
    flex-grow: 0;
    padding: 7px !important;
}
.more-list .v-list__tile {
    font-size: 13px !important;
}
</style>
