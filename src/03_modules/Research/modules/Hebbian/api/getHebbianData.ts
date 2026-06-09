import { api } from '@common/api';
import type { HebbianData } from './types.ts';

export const getHebbianData = async (id: string): Promise<HebbianData> => {
  try {
    return await api.get(`hebbian?id=${id}`).json<HebbianData>();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
