import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { authApi, type LoginDto, type RegisterDto, type ChangePasswordDto, type UserProfile } from '../api/auth.api';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<UserProfile | null>(null);
  const isReady = ref(false);

  const isAuthenticated = computed(() => user.value !== null);
  const isAdmin = computed(() => user.value?.role === 'ADMIN');

  const fetchProfile = async () => {
    const profile = await authApi.fetchProfile();
    user.value = profile;
    return profile;
  };

  const login = async (dto: LoginDto) => {
    const profile = await authApi.login(dto);
    user.value = profile;
    return profile;
  };

  const register = async (dto: RegisterDto) => {
    const profile = await authApi.register(dto);
    user.value = profile;
    return profile;
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch {
      // ignore errors — clear session regardless
    } finally {
      user.value = null;
    }
  };

  const changePassword = async (dto: ChangePasswordDto) => {
    await authApi.changePassword(dto);
  };

  const init = async () => {
    try {
      await fetchProfile();
    } catch {
      user.value = null;
    } finally {
      isReady.value = true;
    }
  };

  return {
    user,
    isReady,
    isAuthenticated,
    isAdmin,
    fetchProfile,
    login,
    register,
    logout,
    changePassword,
    init,
  };
});
