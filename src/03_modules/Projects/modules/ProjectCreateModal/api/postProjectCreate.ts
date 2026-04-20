import { api } from '@common/api';
import type { ProjectCreateResponse, ProjectCreateBody } from './postProjectCreate.d';

export const postProjectCreate = async (body: ProjectCreateBody): ProjectCreateResponse => {
  try {
    return await api
      .post(`research`, {
        json: body,
      })
      .json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
