import { api } from '@common/api';
import type { RecognitionBody } from './postRecognition.d';

export const postRecognition = async (body: RecognitionBody) => {
  try {
    return api.post('/delta/recognition', body);
  } catch (error) {
    console.error(error);
  }
};
