import { api } from '@common/api';
import type { ProjectsResponse } from './getProjects.d';

export const getProjects = async (page: number, limit: number, search: string, filter: string): ProjectsResponse => {
  try {
    const limitQuery = limit ? `&limit=${limit}` : '';
    const searchQuery = search ? `&search=${search}` : '';
    const filterQuery = filter ? `&filter=${filter}` : '';

    return await api.get(`research?page=${page}${limitQuery}${searchQuery}${filterQuery}`).json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
