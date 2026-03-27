import { type RouteRecordRaw } from 'vue-router';

import HomeView from '@pages/HomeView.vue';
import DocsView from '@pages/DocsView.vue';
import HebbianView from '@pages/HebbianView.vue';
import DeltaView from '@pages/DeltaView.vue';
import ResearchView from '@pages/ResearchView.vue';

import DefaultLayout from '../layouts/DefaultLayout.vue';

export const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '/',
        component: HomeView,
      },
      {
        path: '/docs',
        component: DocsView,
      },
      {
        path: '/research',
        component: ResearchView,
      },
      {
        path: '/research/hebbian/:id',
        component: HebbianView,
      },
      {
        path: '/research/delta/:id',
        component: DeltaView,
      },
    ],
  },
];
