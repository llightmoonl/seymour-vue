import { api } from '@common/api';

export const patchAppearance = (data: { theme?: 'LIGHT' | 'DARK'; locale?: 'RU' | 'EN' }) =>
  api.patch('settings/appearance', { json: data });
