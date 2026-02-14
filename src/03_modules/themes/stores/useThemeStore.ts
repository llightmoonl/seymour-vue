import { ref } from 'vue';
import { defineStore } from 'pinia';

import { ALL_THEMES } from '../models/constants';
import type { Theme } from '../themes';
import { isTheme } from '../models/utils';

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<Theme>('system');

  const applyThemeToDOM = (theme: Theme) => {
    document.documentElement.classList.remove(...ALL_THEMES);

    document.documentElement.classList.add(theme);
  };

  const initTheme = () => {
    const storageTheme = localStorage.getItem('theme');
    if (isTheme(storageTheme)) theme.value = storageTheme;

    applyThemeToDOM(theme.value);
  };

  const setTheme = (newTheme: Theme) => {
    if (!isTheme(newTheme)) {
      console.error('Invalid argument specified');
      return;
    }

    localStorage.setItem('theme', newTheme);
    theme.value = newTheme;

    applyThemeToDOM(theme.value);
  };

  return { theme, initTheme, setTheme };
});
