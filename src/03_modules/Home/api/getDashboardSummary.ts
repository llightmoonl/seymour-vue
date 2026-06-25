import { api } from '@common/api';
import type { DashboardSummary } from '../types/dashboard.types';

export const getDashboardSummary = () => api.get('dashboard/summary').json<DashboardSummary>();
