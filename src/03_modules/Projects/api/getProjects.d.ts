import type { Pagination } from '@common/api/types';

export interface ProjectsData {
  id: string;
  title: string;
  type: number;
  algorithmId: number;
  createdAt: string;
  updatedAt: string;
}

export type Projects = Pagination<ProjectsData>;
export type ProjectsResponse = Promise<Projects>;
