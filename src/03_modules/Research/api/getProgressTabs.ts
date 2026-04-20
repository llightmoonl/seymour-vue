import { api } from '@common/api';
import type { ProgressTabsItem, ProgressTabsResponse } from './getProgressTabs';

export const getProgressTabs = async (id: string): ProgressTabsResponse => {
  return api.get<ProgressTabsItem[]>(`research/${id}/progress`).json();
};
