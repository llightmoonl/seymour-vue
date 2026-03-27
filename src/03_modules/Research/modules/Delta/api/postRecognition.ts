import { api } from '@common/api';
import type { RecognitionBody } from './postRecognition.d';

export const postRecognition = async (body: RecognitionBody) => {
  try {
    return api.post('/hebbian/recognition', body);
  } catch (error) {
    console.error(error);
  }
};
