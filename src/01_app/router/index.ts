import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './route';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
