import { api } from '@common/api';
import { type HebbianDataResponse } from './types.d';

export const getHebbianData = async (id: string): HebbianDataResponse => {
  try {
    return api.get(`hebbian?id=${id}`).json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
