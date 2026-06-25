import { api } from '@common/api';

export const postEmailVerifyRequest = () => api.post('profile/email/verify/request', { json: {} });

export const postEmailVerifyConfirm = (token: string) => api.post('profile/email/verify/confirm', { json: { token } });
