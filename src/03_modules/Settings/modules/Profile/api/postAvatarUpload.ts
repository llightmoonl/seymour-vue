import { api } from '@common/api';
import type { UserProfile } from '@modules/Auth/api/auth.api';

export const postAvatarUpload = (file: File): Promise<UserProfile> => {
  const formData = new FormData();
  formData.append('file', file);
  return api.post('profile/avatar', { body: formData }).json<UserProfile>();
};
