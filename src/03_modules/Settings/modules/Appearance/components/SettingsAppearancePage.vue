<script setup lang="ts">
import { useThemeStore } from '@modules/themes';
import { useLocaleStore, type AppLocale } from '@modules/locale';
import { patchAppearance } from '../api/patchAppearance';

const themeStore = useThemeStore();
const localeStore = useLocaleStore();

const themeOptions = [
  { id: 'light', name: 'Светлая' },
  { id: 'dark', name: 'Тёмная' },
];

const localeOptions = [
  { id: 'ru', name: 'Русский' },
  { id: 'en', name: 'English' },
];

const onThemeChange = async (value: string) => {
  themeStore.setTheme(value as 'light' | 'dark');
  try {
    await patchAppearance({ theme: value.toUpperCase() as 'LIGHT' | 'DARK' });
  } catch {
    // ignore sync error
  }
};

const onLocaleChange = async (value: string) => {
  localeStore.setLocale(value as AppLocale);
  try {
    await patchAppearance({ locale: value.toUpperCase() as 'RU' | 'EN' });
  } catch {
    // ignore sync error
  }
};
</script>

<template>
  <div class="settings-appearance">
    <h2 class="settings-appearance__title">{{ $t('settings.appearance.title') }}</h2>

    <div class="settings-appearance__section">
      <div class="settings-appearance__label">{{ $t('settings.appearance.theme-label') }}</div>
      <div class="settings-appearance__options">
        <button
          v-for="option in themeOptions"
          :key="option.id"
          class="settings-appearance__option"
          :class="{ 'settings-appearance__option--active': themeStore.theme === option.id }"
          @click="onThemeChange(option.id)">
          <div class="settings-appearance__option-preview" :data-theme="option.id"></div>
          <span class="settings-appearance__option-name">{{ option.name }}</span>
        </button>
      </div>
    </div>

    <div class="settings-appearance__section">
      <div class="settings-appearance__label">{{ $t('settings.appearance.locale-label') }}</div>
      <div class="settings-appearance__locale-options">
        <button
          v-for="option in localeOptions"
          :key="option.id"
          class="settings-appearance__locale-btn"
          :class="{ 'settings-appearance__locale-btn--active': localeStore.locale === option.id }"
          @click="onLocaleChange(option.id)">
          {{ option.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.settings-appearance {
  &__title {
    margin-block-end: rem(24);
  }

  &__section {
    border: 1px solid var(--border);
    border-radius: rem(12);
    padding: rem(20);
    margin-block-end: rem(16);
  }

  &__label {
    font-size: rem(14);
    font-weight: 600;
    color: var(--muted-foreground);
    margin-block-end: rem(16);
  }

  &__options {
    display: flex;
    gap: rem(12);
  }

  &__option {
    @include reset-btn;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: rem(8);
    padding: rem(4);
    border-radius: rem(8);
    border: 2px solid transparent;
    cursor: pointer;

    &--active {
      border-color: var(--primary);
    }

    @include hover {
      border-color: var(--border);
    }

    &-preview {
      inline-size: rem(80);
      block-size: rem(56);
      border-radius: rem(6);
      border: 1px solid var(--border);

      &[data-theme='light'] {
        background-color: #ffffff;
      }

      &[data-theme='dark'] {
        background-color: #0f0f0f;
      }
    }

    &-name {
      font-size: rem(13);
      font-weight: 500;
    }
  }

  &__locale-options {
    display: flex;
    gap: rem(8);
  }

  &__locale-btn {
    @include reset-btn;
    padding: rem(8) rem(16);
    border-radius: rem(8);
    border: 1px solid var(--border);
    font-size: rem(14);
    font-weight: 500;
    cursor: pointer;
    transition:
      background-color 0.15s ease,
      border-color 0.15s ease;

    &--active {
      background-color: var(--primary);
      color: var(--primary-foreground);
      border-color: var(--primary);
    }

    @include hover {
      background-color: var(--accent);
    }
  }
}
</style>
