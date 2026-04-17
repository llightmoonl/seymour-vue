import { api } from '@common/api';
import type { GenerateDataBody, GenerateDataResponse } from './types.d';

export const putGenerateData = async (body: GenerateDataBody): GenerateDataResponse => {
  try {
    return api
      .put('delta/generateData', {
        json: body,
      })
      .json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
