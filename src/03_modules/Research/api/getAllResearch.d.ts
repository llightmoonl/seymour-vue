import type { AxiosResponse } from 'axios';
import type { Pagination } from '@common/api/types';

export interface ResearchListData {
  id: string;
  title: string;
  type: number;
  algorithmId: number;
  createdAt: string;
  updatedAt: string;
}

export type ResearchList = Pagination<ResearchListData>;
export type ResearchListResponse = Promise<AxiosResponse<ResearchList>>;
