import { type RouteRecordRaw } from 'vue-router';

import HomeView from '@pages/HomeView.vue';
import DocsView from '@pages/DocsView.vue';
import HebbianView from '@pages/HebbianView.vue';
import DeltaView from '@pages/DeltaView.vue';
import ProjectsView from '@pages/ProjectsView.vue';
import BackpropagationView from '@pages/BackpropagationView.vue';
import AuthView from '@pages/AuthView.vue';

import DefaultLayout from '../layouts/DefaultLayout.vue';
import AuthLayout from '../layouts/AuthLayout.vue';

export const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    component: DefaultLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', component: HomeView },
      { path: '/docs', redirect: '/docs/hebbian' },
      { path: '/docs/:slug', component: DocsView },
      { path: '/projects', component: ProjectsView },
      { path: '/projects/hebbian/:id', component: HebbianView },
      { path: '/projects/delta/:id', component: DeltaView },
      { path: '/projects/backpropagation/:id', component: BackpropagationView },
      { path: '/settings', component: () => import('@pages/SettingsView.vue') },
      {
        path: '/admin',
        redirect: '/admin/users',
        meta: { requiresAdmin: true },
        children: [
          { path: 'users', component: () => import('@pages/AdminUsersView.vue') },
          { path: 'docs', component: () => import('@pages/AdminDocsView.vue') },
        ],
      },
    ],
  },
  {
    path: '/auth',
    component: AuthLayout,
    meta: { guest: true },
    children: [
      { path: '/login', name: 'login', component: AuthView },
      { path: '/register', name: 'register', component: AuthView },
    ],
  },
];
