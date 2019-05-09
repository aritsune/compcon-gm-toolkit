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
            <v-text-field
                outline
                label="Notes"
                v-model="npc.notes"
                :color="`role--${npc.npcClass.role}`"
            >
            </v-text-field>
            <v-divider class="mt-2 mb-3" />
            <h6 class="title mb-2 text-xs-left grey--text text--darken-1">
                Systems
            </h6>
            <v-layout>
                <v-flex xs6>
                    <v-card class="picker-card">
                        <v-container>
                            <v-layout justify-start grow-shrink-0 wrap>
                                <system-button
                                    v-for="system in npc.systems"
                                    :key="system.name"
                                    :system="system"
                                    :closable="!system.base"
                                />
                            </v-layout>
                        </v-container>
                    </v-card>
                </v-flex>
                <v-flex xs6>
                    <v-card class="picker-card">
                        <v-tabs dark color="primary" slider-color="secondary">
                            <v-tab v-for="n in 3" :key="n" ripple>
                                Item {{ n }}
                            </v-tab>
                            <v-tab-item v-for="n in 3" :key="n">
                                <v-container fluid>
                                    <v-layout justify-start grow-shrink-0 wrap>
                                        <system-button
                                            v-for="system in systemsAvailable"
                                            :key="system.name"
                                            :system="system"
                                            :addable="true"
                                            @add="addSystem(system)"
                                        />
                                    </v-layout>
                                </v-container>
                            </v-tab-item>
                        </v-tabs>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-card-text>
        <v-divider class="my-1" />
        <v-card-actions class="mb-1 mr-2">
            <v-btn
                flat
                :color="`role--${npc.npcClass.role}`"
                class="ml-auto"
                @click="$router.push('/npc-designer/')"
                >Done</v-btn
            >
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import _ from 'lodash';
// components
import SystemButton from "@/components/NpcDesigner/SystemButton.vue";
// vuex
import { mapState } from 'vuex';

import NPC from '../../logic/NPC';
import { Dictionary } from 'vue-router/types/router';
import { NPCSystem } from '../../logic/interfaces/NPCSystem';

@Component({
    components: { SystemButton }
})
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

    get systemsAvailable(): NPCSystem.Any[] {
      const preSort = this.npc.optional_class_systems.filter(
        sys => !this.npc!.pickedSystems.includes(sys),
      );
      return _.orderBy(
        preSort,
        ['base', 'type', 'name'],
        ['desc', 'desc', 'asc'],
      );
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

    addSystem(system: NPCSystem.Any) {
        alert(system.name)
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
.picker-card {
    border-color: rgba(0, 0, 0, 0.125) !important;
    background-color: #f8f9fa !important;
    height: 100%;
}
.picker-card .v-tabs__bar {
    border-radius: 0;
}
</style>
