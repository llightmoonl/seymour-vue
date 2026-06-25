import type { Pagination } from '@common/api/types';

export type UserRole = 'STUDENT' | 'TEACHER' | 'ADMIN';
export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'BLOCKED';
export type ProjectRule = 'HEBB' | 'DELTA' | 'BACKPROP';
export type ProjectStatus = 'DRAFT' | 'IN_PROGRESS' | 'TRAINED';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  group?: string;
  projectsCount: number;
  createdAt: string;
  lastActiveAt?: string;
}

export interface AdminUserStats {
  total: number;
  active: number;
  students: number;
  teachers: number;
}

export interface AdminUserFilters {
  page?: number;
  limit?: number;
  search?: string;
  role?: UserRole | '';
  status?: UserStatus | '';
  sort?: string;
}

export interface CreateUserDto {
  name: string;
  email: string;
  role: UserRole;
  group?: string;
  status?: UserStatus;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  role?: UserRole;
  group?: string;
  status?: UserStatus;
}

export interface AdminProject {
  id: string;
  title: string;
  rule: ProjectRule;
  status: ProjectStatus;
  accuracy?: number;
  examplesCount?: number;
  epochsCount?: number;
  updatedAt: string;
}

export type AdminUsersResponse = Pagination<AdminUser>;

export interface AdminDoc {
  id: string;
  title: string;
  wordsCount?: number;
  status: string;
  createdAt: string;
}
