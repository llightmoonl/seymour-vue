import { api } from '@common/api';
import type { ProjectsResponse } from './getProjects.d';

export const getProjects = async (page: number, limit: number, search: string): ProjectsResponse => {
  try {
    const searchQuery = search ? `&search=${search}` : '';

    return await api.get(`research?page=${page}&limit=${limit}${searchQuery}`).json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
