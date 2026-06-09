import { api } from '@common/api';
import type { GenerateData, GenerateDataBody } from './types.ts';

export const putGenerateData = async (body: GenerateDataBody): Promise<GenerateData> => {
  try {
    return await api
      .put('hebbian/generateData', {
        json: body,
      })
      .json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
