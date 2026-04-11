import type { Pagination } from '@common/api/types';

export interface ProjectsListData {
  id: string;
  title: string;
  type: number;
  algorithmId: number;
  createdAt: string;
  updatedAt: string;
}

export type ProjectsList = Pagination<ProjectsListData>;
export type ProjectsListResponse = Promise<ProjectsList>;
