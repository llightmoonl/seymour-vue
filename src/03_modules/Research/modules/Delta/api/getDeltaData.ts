import { api } from '@common/api';

export const getDeltaData = async (id: string) => {
  try {
    return api.get(`/delta?id=${id}`);
  } catch (error) {
    console.error(error);
  }
};
