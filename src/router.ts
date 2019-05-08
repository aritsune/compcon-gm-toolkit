import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home.vue';
import UnderConstruction from './views/UnderConstruction.vue';

import NpcDesignerIndex from './views/NpcDesigner/NpcDesignerIndex.vue';
import NpcsList from './views/NpcDesigner/NpcsList.vue';
import NpcDisplay from './views/NpcDesigner/NpcDisplay.vue';

Vue.use(Router);

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
