import { api } from '@common/api';
import type { RecognitionBody, RecognitionResponse } from './types.d';

export const postRecognition = async (body: RecognitionBody): RecognitionResponse => {
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
