import { api } from '@common/api';
import type { RecognitionBody, RecognitionResponse } from './types.ts';

export const postRecognition = async (body: RecognitionBody): RecognitionResponse => {
  try {
    return api
      .post('delta/recognition', {
        json: body,
      })
      .json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
