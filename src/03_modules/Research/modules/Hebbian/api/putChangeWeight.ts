import { api } from '@common/api';
import type { ChangeWeightBody, ChangeWeightData } from './types.ts';

export const putChangeWeight = async (body: ChangeWeightBody): Promise<ChangeWeightData> => {
  try {
    return api
      .put('hebbian/generateWeight', {
        json: body,
      })
      .json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
