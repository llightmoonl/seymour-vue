import { api } from '@common/api';

export const generateData = async (id: string, x: number[][][]) => {
  try {
    return api.put('/hebbian/generateData', {
      id,
      x
    })

  } catch (error) {
    console.error(error);
  }
}
