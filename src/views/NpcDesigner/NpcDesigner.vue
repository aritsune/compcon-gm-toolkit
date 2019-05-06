<template>
    <v-container mt-5 class="v-container">
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
                <File :name="npc.name" icon="mdi-account" more />
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
// components
import File from "@/components/File.vue";
import AddButton from "@/components/AddButton.vue";
// vuex
import { mapState } from 'vuex';

export default {
    components: { File, AddButton },
    computed: mapState('npcDesigner', ['npcs'])
}
</script>

<style>
@media screen and (min-width: 960px) {
    .v-container {
        width: 70%;
    }
}

.file-list > .flex {
    flex-grow: 0;
    padding: 7px !important;
}
</style>
