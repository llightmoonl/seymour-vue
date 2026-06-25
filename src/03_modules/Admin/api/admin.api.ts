import { api } from '@common/api';
import type {
  AdminUser,
  AdminUserStats,
  AdminUserFilters,
  AdminUsersResponse,
  CreateUserDto,
  UpdateUserDto,
  AdminProject,
} from '../types/admin.types';

export const getAdminUsers = (filters: AdminUserFilters = {}): Promise<AdminUsersResponse> => {
  const searchParams: Record<string, string | number> = {};
  if (filters.page) searchParams.page = filters.page;
  if (filters.limit) searchParams.limit = filters.limit;
  if (filters.search) searchParams.search = filters.search;
  if (filters.role) searchParams.role = filters.role;
  if (filters.status) searchParams.status = filters.status;
  if (filters.sort) searchParams.sort = filters.sort;
  return api.get('admin/users', { searchParams }).json<AdminUsersResponse>();
};

export const getAdminUserStats = () => api.get('admin/users/stats').json<AdminUserStats>();

export const exportAdminUsers = () => api.get('admin/users/export').blob();

export const postAdminUser = (dto: CreateUserDto) => api.post('admin/users', { json: dto }).json<AdminUser>();

export const patchAdminUser = (id: string, dto: UpdateUserDto) =>
  api.patch(`admin/users/${id}`, { json: dto }).json<AdminUser>();

export const deleteAdminUser = (id: string) => api.delete(`admin/users/${id}`);

export const getAdminUserProjects = (userId: string) =>
  api.get(`admin/users/${userId}/projects`).json<AdminProject[]>();

export const getAdminUserProjectsReport = (userId: string) => api.get(`admin/users/${userId}/projects/report`).blob();

export const deleteAdminDoc = (id: string) => api.delete(`admin/docs/${id}`);
