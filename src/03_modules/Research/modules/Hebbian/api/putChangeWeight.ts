import { api } from '@common/api';
import type { ChangeWeightBody } from './putChangeWeight.d';

export const putChangeWeight = async (body: ChangeWeightBody) => {
  try {
    return api.put('/hebbian/generateWeight', body);
  } catch (error) {
    console.error(error);
  }
};
