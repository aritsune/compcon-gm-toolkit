<template>
    <v-container fluid>
        <v-layout align-center>
            <h3 class="headline text-xs-left ml-2 grey--text text--darken-1">
                Active Encounters
            </h3>
            <v-flex ml-auto style="padding: 7px; flex-grow: 0;">
                <add-button
                    text="Run New Encounter"
                    to="/encounter-runner/new"
                />
            </v-flex>
        </v-layout>
        <v-divider class="mb-3" />
        <v-slide-y-transition
            group
            tag="div"
            class="layout row wrap justify-start"
        >
            <v-flex
                v-for="encounter in activeEncounters"
                :key="encounter.id"
                xs12
                sm6
                md2
            >
                <File
                    :name="encounter.name"
                    icon="mdi-account-group"
                    more
                    :to="`/encounter-runner/${encounter.id}`"
                    color="orange"
                >
                    <template v-slot:extra-icons> </template>
                </File>
            </v-flex>
        </v-slide-y-transition>
    </v-container>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class';
import ActiveEncounter from '@/logic/ActiveEncounter'
// components
import File from "@/components/File.vue";
import AddButton from "@/components/AddButton.vue";

const encounterRunner = namespace('encounterRunner')

@Component({
    components: { File, AddButton }
})
export default class EncounterRunnerList extends Vue {
    @encounterRunner.State activeEncounters!: ActiveEncounter[];
    @encounterRunner.Mutation('delete') deleteEncounter!: (id: string) => void;
}
</script>