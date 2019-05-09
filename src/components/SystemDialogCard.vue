<template>
    <v-card>
        <v-card-title
            class="headline"
            :class="`system--${system.type} white--text`"
        >
            <v-icon dark left>{{ icon }}</v-icon>
            {{ system.name }}
            <div class="subheading ml-auto mr-2">
                <span v-if="system.type === 'weapon'">
                    {{ system.weapon_type.join(' ') }}
                </span>
                <span v-else-if="system.action">
                    {{ actionName(system.action) }}
                </span>
            </div>
            <v-btn outline color="white" v-ripple="false">
                {{ system.class }}
            </v-btn>
        </v-card-title>

        <v-card-text>
            <v-layout v-if="system.type === 'weapon'">
                <v-flex>
                    <v-icon>mdi-dice-multiple</v-icon>
                    {{ printRoll(system.weapon_roll) }}
                </v-flex>
                <v-flex>
                    <v-icon>mdi-vector-line</v-icon>
                    {{ printRange(system.weapon_range) }}
                </v-flex>
                <v-flex v-if="system.damage">
                    <v-icon>mdi-flare</v-icon>
                    {{ printDamage(system.damage) }}
                </v-flex>
            </v-layout>
            <p v-if="system.effect" class="my-2">
                {{ system.effect }}
            </p>
            <div v-if="system.tags">
                <v-chip
                    dark
                    color="primary"
                    small
                    v-for="tag in system.tags"
                    :key="tag.name"
                    >{{ renderTag(tag, npc && npc.tier) }}</v-chip
                >
            </div>
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { NPCSystem } from '../logic/interfaces/NPCSystem';
import NPC from '../logic/NPC';
import renderTag from '../logic/rendertag';

@Component({

})
export default class SystemDialogCard extends Vue {
    @Prop(Object) readonly system!: NPCSystem.Any;
    @Prop(Object) readonly npc!: NPC;

    renderTag = renderTag

    get icon(): string {
        switch (this.system.type) {
            case 'system':
                return 'mdi-settings'
                break;
            case 'trait':
                return 'mdi-account-circle'
                break;
            case 'weapon':
                return 'mdi-sword-cross'
                break;
        }
    }

    actionName(s: string): string {
      const map = {
        free: 'Free Action',
        quick: 'Quick Action',
        full: 'Full Action',
        protocol: 'Protocol',
        reaction: 'Reaction',
        quicktech: 'Quick Tech',
        fulltech: 'Full Tech',
      } as any;
      return map[s];
    }
    
    printRoll(rollObj: NPCSystem.Roll, tech: boolean) {
      const { flat, accdiff } = rollObj;
      let output = '';
      if (flat) {
        if (flat.val > -1) output += '+';
        output += flat.val;
      } else {
        output += '0';
      }
      output += tech ? ' vs e-defense' : ' vs evasion';
      if (flat && flat.pertier) {
        output += '/tier';
      }
      if (accdiff) {
        const word = accdiff.val > -1 ? '+' : '-';
        output += ` with +${Math.abs(accdiff.val)} ${word}`;
        if (accdiff.pertier) {
          output += '/tier';
        }
      }
      return output;
    }

    printDamage(damageAry: 
        { val: [number, number, number]; type: string }[]
    ) {
      return damageAry
        .map(damageObj => `${damageObj.val.join('/')} ${damageObj.type}`)
        .join(' + ');
    }

    printRange(rangeAry: { val: number; type: string }[]) {
      return rangeAry.map(r => `${r.type} ${r.val}`).join(' ');
    }

}
</script>