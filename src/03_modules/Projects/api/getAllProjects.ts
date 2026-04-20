import { api } from '@common/api';
import type { ProjectsListResponse } from './getAllProjects.d';

export const getAllProjects = async (page: number, limit: number): ProjectsListResponse => {
  try {
    return await api.get(`research?page=${page}&limit=${limit}`).json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
