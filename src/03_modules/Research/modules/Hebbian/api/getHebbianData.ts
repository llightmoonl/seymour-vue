import { api } from '@common/api';

export const getHebbianData = async (id: string) => {
  try {
    return api.get(`/hebbian?id=${id}`);
  } catch (error) {
    console.error(error);
  }
};
