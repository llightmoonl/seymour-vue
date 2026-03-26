import { api } from '@common/api';
import type { CreateResearchResponse, CreateResearchBody } from './postCreateResearch.d';

export const postCreateResearch = async (body: CreateResearchBody): CreateResearchResponse => {
  try {
    return await api.post(`research`, body);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
