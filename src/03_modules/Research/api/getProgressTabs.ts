import { api } from '@common/api';
import type { ProgressTabsItem, ProgressTabsResponse } from './getProgressTabs.d';

export const getProgressTabs = async (id: string): ProgressTabsResponse => {
  const response = await api.get<ProgressTabsItem[]>(`/research/${id}/progress`);
  return response.data;
};
