import { api } from '@common/api';
import type { ResearchListResponse } from './getAllResearch.d';

export const getAllResearch = async (page: number, limit: number): ResearchListResponse => {
  try {
    return await api.get(`research?page=${page}&limit=${limit}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
