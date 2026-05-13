import { api } from '@common/api';
import type { DocUniqueResponse } from './types';

export const getUniqueDocs = async (slug: string): DocUniqueResponse => {
  try {
    return api.get(`docs/${slug}`).json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
