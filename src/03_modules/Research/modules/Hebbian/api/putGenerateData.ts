import { api } from '@common/api';
import type { GenerateDataBody } from './putGenerateData.d';

export const putGenerateData = async (body: GenerateDataBody) => {
  try {
    return api.put('/hebbian/generateData', body);
  } catch (error) {
    console.error(error);
  }
};
