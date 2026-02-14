import { type RouteRecordRaw } from 'vue-router';

import HomeView from '@pages/HomeView.vue';
import DocsView from '@pages/DocsView.vue';
import ResearchView from '@pages/ResearchView.vue';
import UiView from '@pages/uiView.vue';

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
        path: '/ui',
        component: UiView,
      },
    ],
  },
];
