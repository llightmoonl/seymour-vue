import { api } from '@common/api';
import type { RecognitionBody, RecognitionData } from './types.ts';

export const postRecognition = async (body: RecognitionBody): Promise<RecognitionData> => {
  try {
    return api
      .post('hebbian/recognition', {
        json: body,
      })
      .json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
