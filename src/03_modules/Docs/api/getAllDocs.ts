import { api } from '@common/api';
import type { DocAllResponse } from './types';

export const getAllDocs = async (): DocAllResponse => {
  try {
    return api.get(`docs`).json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
