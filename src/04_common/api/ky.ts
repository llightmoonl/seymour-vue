import ky from 'ky';

let refreshPromise: Promise<void> | null = null;

async function doRefresh(): Promise<void> {
  if (refreshPromise) return refreshPromise;
  refreshPromise = ky
    .post('auth/refresh', {
      prefixUrl: import.meta.env.VITE_API_URL,
      credentials: 'include',
    })
    .then(() => {})
    .finally(() => {
      refreshPromise = null;
    });
  return refreshPromise;
}

export const api = ky.create({
  prefixUrl: import.meta.env.VITE_API_URL,
  credentials: 'include',
  retry: {
    limit: 1,
    statusCodes: [401],
    methods: ['get', 'post', 'put', 'patch', 'delete'],
  },
  hooks: {
    beforeRetry: [
      async ({ retryCount }) => {
        if (retryCount === 0) {
          try {
            await doRefresh();
          } catch {
            window.location.href = '/login';
            return ky.stop;
          }
        }
      },
    ],
  },
});
