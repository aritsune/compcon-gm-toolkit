<template>
  <div>
    <transition name="fade" mode="out-in">
      <!-- Main view -->
      <div key="designer" v-if="state === 'designing'">
        <div class="mb-3 d-flex align-items-center">
          <div>
            <h4 class="mb-0">Encounter - {{ npcs.length }} NPCs</h4>
          </div>
          <input
            type="file"
            accept=".json"
            style="display: none"
            ref="encounter-file"
            @change="loadEncounter"
          />
          <b-button
            size="sm"
            variant="primary"
            class="ml-auto"
            title="Load encounter"
            @click="openFile"
          >
            <folder-icon style="font-size: 24px" />
          </b-button>
          <b-button
            size="sm"
            variant="primary"
            class="ml-2"
            title="Save encounter"
          >
            <content-save-icon style="font-size: 24px" @click="saveEncounter" />
          </b-button>
        </div>
        <!-- <div v-for="(npc, i) in npcs" :key="i">
          <npc-card
            :npc="npc"
            @delete="deleteNPC(i)"
            @edit="editNPC([i, npc])"
          />
        </div> -->
        <b-container fluid class="mb-4 w-100">
          <b-row>
            <MockupCard
              class="mb-4"
              v-for="(npc, i) in npcs"
              :key="i"
              :npc="npc"
              editable
              @delete="deleteNPC(i)"
              @duplicate="duplicateNPC([i, npc])"
              @edit="editNPC([i, npc])"
            />
          </b-row>
        </b-container>
        <b-button
          size="sm"
          block
          variant="primary"
          @click="state = 'creating-npc'"
        >
          <plus-icon style="font-size: 24px;" />
        </b-button>
      </div>
      <!-- NPC designer -->
      <npc-designer
        key="npcdesigner"
        v-else-if="state === 'creating-npc' || 'editing-npc'"
        @newnpc="onNewNPC"
        :editing="state === 'editing-npc'"
        :editingnpc="editingNPC && editingNPC[1]"
      />
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import NpcDesigner from './NpcDesigner.vue';

import MockupCard from './MockupCard/Mockup.vue';

import NPCClass, { NPCStatBlock } from '@/logic/interfaces/NPCClass';
import { NPCSystem } from '@/logic/interfaces/NPCSystem';
import NPC from '@/logic/NPC.ts';

import PlusIcon from 'vue-material-design-icons/Plus.vue';
import ContentSaveIcon from 'vue-material-design-icons/ContentSave.vue';
import FolderIcon from 'vue-material-design-icons/Folder.vue';

import _ from 'lodash';
import { saveAs } from 'file-saver';

export default Vue.extend({
  name: 'encounter-designer',
  components: {
    NpcDesigner,
    PlusIcon,
    ContentSaveIcon,
    FolderIcon,
    MockupCard,
  },
  data: () => ({
    state: 'designing',
    npcs: [] as NPC[],
    editingNPC: null as [number, NPC] | null,
  }),
  props: {
    msg: String,
  },
  methods: {
    onNewNPC(npc: NPC) {
      if (this.state === 'creating-npc') {
        this.npcs.push(npc);
      } else if (this.state === 'editing-npc' && this.editingNPC) {
        const [i, npc] = this.editingNPC;
        this.npcs[i] = npc;
      }
      this.state = 'designing';
    },
    deleteNPC(i: number) {
      _.pullAt(this.npcs, i);
      this.npcs = [...this.npcs];
    },
    duplicateNPC(payload: [number, NPC]) {
      const [i, npc] = payload;
      const npcCopy = _.clone(npc);
      this.npcs.splice(i, 0, npcCopy);
      this.npcs = [...this.npcs];
    },
    editNPC(payload: [number, NPC]) {
      this.editingNPC = payload;
      this.state = 'editing-npc';
    },
    saveEncounter() {
      const serialized = this.npcs.map(npc => npc.serialize());
      const blob = new Blob([JSON.stringify(serialized, null, 2)], {
        type: 'text/json;charset=utf-8',
      });
      saveAs(blob, `encounter-${new Date().toLocaleString()}.json`);
    },
    openFile() {
      const fileInput = this.$refs['encounter-file'] as HTMLInputElement;
      fileInput.click();
    },
    loadEncounter(ev: Event) {
      const fileInput = ev.target as HTMLInputElement;
      const file = fileInput.files![0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        if (!reader.result) throw new Error('failed to read json');
        const parsed = JSON.parse(reader.result as string);
        this.npcs = parsed.map(NPC.deserialize);
      };
      reader.readAsText(file);
    },
  },
});
</script>

<style scoped>
.generator {
  margin-top: 5em;
  width: 90%;
}
@media (min-width: 576px) {
  .generator {
    width: 70%;
  }
}
.col {
  padding: 0;
}
.output {
  width: 100%;
  min-height: 500px;
}
</style>
