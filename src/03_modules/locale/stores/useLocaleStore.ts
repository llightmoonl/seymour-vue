import { ref } from 'vue';
import { defineStore } from 'pinia';
import { i18n } from '@app/i18n';

export type AppLocale = 'ru' | 'en';

export const useLocaleStore = defineStore(
  'locale',
  () => {
    const locale = ref<AppLocale>((import.meta.env.VITE_CURRENT_LANGUAGE as AppLocale) ?? 'ru');

    const setLocale = (newLocale: AppLocale) => {
      locale.value = newLocale;
      i18n.global.locale.value = newLocale;
    };

    const init = () => {
      i18n.global.locale.value = locale.value;
    };

    return { locale, setLocale, init };
  },
  {
    persist: {
      pick: ['locale'],
    },
  },
);
