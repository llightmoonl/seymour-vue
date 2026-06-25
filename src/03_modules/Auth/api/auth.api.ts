import { api } from '@common/api';

export interface LoginDto {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'STUDENT' | 'TEACHER' | 'ADMIN';
  avatarUrl?: string;
  emailVerified?: boolean;
  passwordChangedAt?: string;
}

export const authApi = {
  login: (dto: LoginDto) => api.post('auth/login', { json: dto, credentials: 'include' }).json<UserProfile>(),
  register: (dto: RegisterDto) => api.post('auth/register', { json: dto, credentials: 'include' }).json<UserProfile>(),
  logout: () => api.post('auth/logout', { credentials: 'include' }),
  refresh: () => api.post('auth/refresh', { credentials: 'include' }).json<UserProfile>(),
  fetchProfile: () => api.get('profile', { credentials: 'include' }).json<UserProfile>(),
  changePassword: (dto: ChangePasswordDto) => api.post('auth/change-password', { json: dto, credentials: 'include' }),
};
