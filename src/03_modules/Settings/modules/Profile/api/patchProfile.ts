import { api } from '@common/api';
import type { UserProfile } from '@modules/Auth/api/auth.api';

export const patchProfile = (data: { name?: string; avatarUrl?: string }) =>
  api.patch('profile', { json: data }).json<UserProfile>();
