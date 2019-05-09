import Vue from 'vue';
import Router from 'vue-router';

import store from './store';

import Home from './views/Home.vue';
import UnderConstruction from './views/UnderConstruction.vue';

import NpcDesignerIndex from './views/NpcDesigner/NpcDesignerIndex.vue';
import NpcBuilder from './views/NpcDesigner/NpcBuilder.vue';
import NpcClassPicker from './views/NpcDesigner/NpcClassPicker.vue';
import NpcsList from './views/NpcDesigner/NpcsList.vue';
import NpcDisplay from './views/NpcDesigner/NpcDisplay.vue';
import NPC from './logic/NPC';

Vue.use(Router);

function getNPC(id: string): NPC {
  return (store.state as any).npcDesigner.npcs.find((n: NPC) => n.id === id);
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/npc-designer',
      component: NpcDesignerIndex,
      children: [
        {
          path: '',
          name: 'npc-list',
          component: NpcsList,
        },
        {
          path: '/npc/:id',
          name: 'npc',
          component: NpcDisplay,
          props: route => ({
            npc: getNPC(route.params.id),
          }),
        },
        {
          path: '/npc-designer/new',
          name: 'npc-new',
          component: NpcClassPicker,
        },
        {
          path: '/npc-designer/edit/:id',
          name: 'npc-edit',
          component: NpcBuilder,
          props: route => ({
            preNpc: getNPC(route.params.id),
          }),
        },
      ],
    },
    {
      path: '/encounter-builder',
      name: 'encounter-builder',
      component: UnderConstruction,
    },
    {
      path: '/encounter-runner',
      name: 'encounter-runner',
      component: UnderConstruction,
    },
    {
      path: '/about',
      name: 'about',
      component: UnderConstruction,
    },
  ],
});
