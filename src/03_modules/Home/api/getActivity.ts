import { api } from '@common/api';
import type { ActivityResponse } from '../types/dashboard.types';

export const getActivity = (page = 1, limit = 10) =>
  api.get('activity', { searchParams: { page, limit } }).json<ActivityResponse>();
