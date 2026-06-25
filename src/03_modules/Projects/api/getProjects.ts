import { api } from '@common/api';
import type { Pagination } from '@common/api/types';

export interface ProjectItem {
  id: string;
  title: string;
  type: number;
  status: 'DRAFT' | 'IN_PROGRESS' | 'TRAINED';
  createdAt: string;
  updatedAt: string;
}

export interface GetProjectsParams {
  page?: number;
  limit?: number;
  status?: string;
  filter?: string;
  sort?: string;
  search?: string;
}

export type ProjectsResponse = Pagination<ProjectItem>;

export const getProjects = (params: GetProjectsParams = {}): Promise<ProjectsResponse> => {
  const searchParams: Record<string, string | number> = {};
  if (params.page) searchParams.page = params.page;
  if (params.limit) searchParams.limit = params.limit;
  if (params.status) searchParams.status = params.status;
  if (params.filter) searchParams.filter = params.filter;
  if (params.sort) searchParams.sort = params.sort;
  if (params.search) searchParams.search = params.search;
  return api.get('research', { searchParams }).json<ProjectsResponse>();
};
