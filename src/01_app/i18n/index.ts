import { createI18n } from 'vue-i18n';
// import { useCookies } from '@vueuse/integrations/useCookies';

import ru from '@common/locales/ru.json';
import en from '@common/locales/en.json';

const languages = {
  en,
  ru,
};

const currentLanguage = 'ru';

export const i18n = createI18n({
  locale: currentLanguage,
  fallbackLocale: 'en',
  globalInjection: true,
  messages: languages,
});
