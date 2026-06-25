import { api } from '@common/api';

export const deleteAccount = (password: string) => api.delete('account', { json: { password } });
