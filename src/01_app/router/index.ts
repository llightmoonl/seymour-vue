import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './route';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to) => {
  const { useAuthStore } = await import('@modules/Auth/stores/useAuthStore');
  const authStore = useAuthStore();

  if (!authStore.isReady) {
    await authStore.init();
  }

  const requiresAuth = to.matched.some((r) => r.meta.requiresAuth);
  const requiresAdmin = to.matched.some((r) => r.meta.requiresAdmin);
  const isGuest = to.matched.some((r) => r.meta.guest);

  if (isGuest && authStore.isAuthenticated) {
    return '/';
  }

  if (requiresAuth && !authStore.isAuthenticated) {
    return '/login';
  }

  if (requiresAdmin && !authStore.isAdmin) {
    return '/';
  }
});
