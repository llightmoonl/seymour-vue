import { type RouteRecordRaw } from 'vue-router';

import HomeView from '@pages/HomeView.vue';
import DocsView from '@pages/DocsView.vue';
import HebbianView from '@pages/HebbianView.vue';
import DeltaView from '@pages/DeltaView.vue';
import ProjectsView from '@pages/ProjectsView.vue';
import BackpropagationView from '@pages/BackpropagationView.vue';

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
        path: '/projects',
        component: ProjectsView,
      },
      {
        path: '/projects/hebbian/:id',
        component: HebbianView,
      },
      {
        path: '/projects/delta/:id',
        component: DeltaView,
      },
      {
        path: '/projects/backpropagation/:id',
        component: BackpropagationView,
      },
    ],
  },
];
