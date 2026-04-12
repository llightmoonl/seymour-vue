import { api } from '@common/api';
import type { CompleteTabBody } from './postCompleteTab.d';

export const postCompleteTab = async (id: string, body: CompleteTabBody) => {
  const response = await api.post(`research/${id}/progress/complete`, {
    json: body,
  });
  return response;
};
