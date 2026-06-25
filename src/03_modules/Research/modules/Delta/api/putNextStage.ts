import { api } from '@common/api';
import type { NextStageBody, NextStageData } from './types';

export const putNextStage = async (body: NextStageBody): Promise<NextStageData> => {
  try {
    return await api
      .put('delta/nextStage', {
        json: body,
      })
      .json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
