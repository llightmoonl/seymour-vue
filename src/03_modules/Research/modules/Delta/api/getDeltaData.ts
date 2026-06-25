import { api } from '@common/api';
import type { DeltaDataResponse } from './types.ts';

export const getDeltaData = async (id: string): DeltaDataResponse => {
  try {
    return api.get(`delta?id=${id}`).json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
