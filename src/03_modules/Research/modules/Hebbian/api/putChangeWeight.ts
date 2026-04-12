import { api } from '@common/api';
import type { ChangeWeightBody, ChangeWeightResponse } from './types.d';

export const putChangeWeight = async (body: ChangeWeightBody): ChangeWeightResponse => {
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
