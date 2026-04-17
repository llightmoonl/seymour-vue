import { createI18n } from 'vue-i18n';
// import { useCookies } from '@vueuse/integrations/useCookies';

import ru from '@common/locales/ru.json';
import en from '@common/locales/en.json';
import { declensionSlavicWords } from '@common/utils/pluralize.ts';

const languages = {
  en,
  ru,
};

const pluralRules = {
  ru: declensionSlavicWords,
};

const currentLanguage = import.meta.env.VITE_CURRENT_LANGUAGE;

export const i18n = createI18n({
  locale: currentLanguage,
  pluralRules: pluralRules,
  fallbackLocale: 'en',
  globalInjection: true,
  messages: languages,
});
