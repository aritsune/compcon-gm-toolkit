<template>
    <v-card :class="`role--${npc.npcClass.role}--text`">
        <!-- Header -->
        <v-card-title
            class="white--text d-flex"
            :class="`role--${npc.npcClass.role}`"
            style="min-height: 70px;"
        >
            <v-container fluid style="padding: 0 16px">
                <v-layout
                    align-center
                    grow-shrink-0
                    :class="{
                        column: $vuetify.breakpoint.xsOnly,
                        'justify-center': $vuetify.breakpoint.xsOnly,
                    }"
                >
                    <v-fade-transition leave-absolute>
                        <v-layout
                            align-center
                            v-if="!editingName"
                            class="name"
                            key="name"
                        >
                            <v-flex headline>
                                {{ npc.name }}
                            </v-flex>
                            <v-flex>
                                <v-btn
                                    flat
                                    dark
                                    class="my-0 mx-1 px-2"
                                    style="min-width: 0;"
                                    @click="editName"
                                >
                                    <v-icon>mdi-pencil</v-icon>
                                </v-btn>
                            </v-flex>
                        </v-layout>
                        <v-flex v-else key="editname">
                            <v-text-field
                                ref="namefield"
                                required
                                dark
                                color="white"
                                v-model="newName"
                                @blur="submitName"
                                @keyup.enter="$refs.namefield.blur"
                                class="mx-0 my-0"
                            >
                            </v-text-field>
                        </v-flex>
                    </v-fade-transition>
                    <v-flex ml-auto subheading shrink>
                        <div class="text-uppercase">
                            {{ npc.npcClass.name }}
                        </div>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card-title>
        <v-card-text class="px-4">
            <v-layout wrap justify-space-around class="statblock">
                <v-flex
                    xs6
                    sm2
                    lg1
                    v-for="stat in Object.keys(stats)"
                    :key="stat"
                >
                    <div class="label">{{ stat }}</div>
                    <div class="headline font-weight-bold primary--text">
                        {{ stats[stat] }}
                    </div>
                </v-flex>
                <v-flex xs6 sm2 lg1>
                    <div class="label">
                        SIZE
                    </div>
                    <div class="headline font-weight-bold primary--text">
                        <v-select
                            v-if="npc.npcClass.size.length > 1"
                            :items="npc.npcClass.size"
                            v-model="npc.size"
                            :color="`role--${npc.npcClass.role}`"
                        />
                        <div
                            v-else
                            class="headline font-weight-bold primary--text"
                        >
                            {{ npc.size }}
                        </div>
                    </div>
                </v-flex>
            </v-layout>
            <v-divider class="my-3" />
            <!-- HASE -->
            <v-layout wrap justify-space-around class="statblock">
                <v-flex
                    xs6
                    sm2
                    lg1
                    v-for="hase in [
                        'hull',
                        'agility',
                        'systems',
                        'engineering',
                    ]"
                    :key="hase"
                >
                    <div class="label text-uppercase">{{ hase }}</div>
                    <div class="headline font-weight-bold primary--text">
                        {{ npc.stats[hase] > -1 ? '+' : ''
                        }}{{ npc.stats[hase] }}
                    </div>
                </v-flex>
            </v-layout>
            <v-divider class="my-3" />
            <h6 class="subheading text-xs-left grey--text text--darken-1">
                Notes
            </h6>
            <v-text-field v-model="npc.notes" color="grey"> </v-text-field>
        </v-card-text>
        <v-card-actions class="mb-1 mr-2">
            <v-btn
                flat
                :color="`role--${npc.npcClass.role}`"
                class="ml-auto"
                to="/npc-designer/"
                >Done</v-btn
            >
            <!-- Delete dialog -->
            <!-- <v-dialog v-model="deleteDialog" persistent max-width="290">
                <template v-slot:activator="{ on }">
                    <v-btn
                        flat
                        :color="`role--${npc.npcClass.role}`"
                        class="mr-3"
                        v-on="on"
                        >Delete</v-btn
                    >
                </template>
                <v-card>
                    <v-card-title class="headline"
                        >Delete {{ npc.name }}?</v-card-title
                    >
                    <v-card-text>This cannot be undone.</v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            :color="`role--${npc.npcClass.role}`"
                            flat
                            @click="deleteSelf"
                            >OK</v-btn
                        >
                        <v-btn
                            :color="`role--${npc.npcClass.role}`"
                            flat
                            @click="deleteDialog = false"
                            >Cancel</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-dialog> -->
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import _ from 'lodash';
// components
import File from "@/components/File.vue";
import AddButton from "@/components/AddButton.vue";
// vuex
import { mapState } from 'vuex';

import NPC from '../../logic/NPC';
import { Dictionary } from 'vue-router/types/router';

@Component
export default class NpcBuilder extends Vue {
    @Prop(Object) readonly preNpc!: NPC

    editingName = false;
    newName = '';
    npc = _.clone(this.preNpc);
    
    get stats() {
        const npcst = (this.npc as NPC).stats
        let obj: {[key: string]: number | null} = {
            'HP': npcst.hp,
            'HEAT': npcst.heatcap,
            'STRUCTURE': npcst.structure > 1 ? npcst.structure : null,
            'STRESS': npcst.stress > 1 ? npcst.stress : null,
            'ARMOR': npcst.armor,
            'SPEED': npcst.speed,
            'EVADE': npcst.evade,
            'EDEF': npcst.edef,
            'SENSE': npcst.sensor,
            'SAVE': npcst.save,
        }
        return _.pickBy(obj, o => o !== null);
    }

    editName() {
        this.editingName = true;
        this.newName = (this.npc as NPC)._name || '';
        this.$nextTick(() => {
            (this.$refs.namefield as any).focus()
        })
    }

    submitName() {
        if (this.newName) {
            (this.npc as NPC)._name = this.newName;
        }
        this.editingName = false;
    }

    @Watch('npc', {deep: true})
    onEditNPC(val: NPC) {
        this.$store.commit('npcDesigner/edit', val)
    }

}
</script>

<style>
/* fixing some weird positioning glitches with the name-edit transition */
.name.fade-transition-enter-active {
    position: relative;
    top: -2px;
}
.name.fade-transition-leave-active {
    position: relative;
    bottom: 1px;
}
.v-input {
    padding: 0 !important;
    margin: 0 !important;
}
.v-input__slot {
    margin-bottom: 0 !important;
}
.v-input .v-messages {
    display: none;
}
.label {
    font-size: 1em;
    font-weight: bold;
}
/* .v-select__selection {
    font-size: 24px;
    margin-left: 60%;
} */
</style>
