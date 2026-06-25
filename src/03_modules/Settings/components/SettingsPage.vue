<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import VContainer from '@common/components/VContainer/VContainer.vue';
import SettingsProfilePage from '../modules/Profile/components/SettingsProfilePage.vue';
import SettingsAppearancePage from '../modules/Appearance/components/SettingsAppearancePage.vue';
import SettingsSecurityPage from '../modules/Security/components/SettingsSecurityPage.vue';

const { t } = useI18n();

const navItems = [
  { id: 'profile', label: t('settings.nav.profile') },
  { id: 'appearance', label: t('settings.nav.appearance') },
  { id: 'security', label: t('settings.nav.security') },
];

const activeSection = ref('profile');
let observer: IntersectionObserver | null = null;

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id;
        }
      });
    },
    { rootMargin: '-15% 0px -75% 0px' },
  );

  navItems.forEach(({ id }) => {
    const el = document.getElementById(id);
    if (el) observer!.observe(el);
  });
});

onUnmounted(() => {
  observer?.disconnect();
});
</script>

<template>
  <div class="settings">
    <v-container size="lg">
      <h1 class="settings__title">{{ $t('settings.title') }}</h1>
      <div class="settings__layout">
        <nav class="settings__nav">
          <a
            v-for="item in navItems"
            :key="item.id"
            :href="`#${item.id}`"
            class="settings__nav-item"
            :class="{ 'settings__nav-item--active': activeSection === item.id }"
            @click.prevent="scrollToSection(item.id)">
            {{ item.label }}
          </a>
        </nav>
        <div class="settings__content">
          <section id="profile" class="settings__section">
            <settings-profile-page />
          </section>
          <section id="appearance" class="settings__section">
            <settings-appearance-page />
          </section>
          <section id="security" class="settings__section">
            <settings-security-page />
          </section>
        </div>
      </div>
    </v-container>
  </div>
</template>

<style scoped lang="scss">
.settings {
  margin-block-start: rem(64);
  margin-block-end: rem(64);

  &__title {
    margin-block-end: rem(32);
  }

  &__layout {
    display: grid;
    grid-template-columns: rem(200) 1fr;
    gap: rem(32);
    align-items: start;
  }

  &__nav {
    position: sticky;
    top: rem(24);
    display: flex;
    flex-direction: column;
    gap: rem(2);
  }

  &__nav-item {
    padding: rem(8) rem(12);
    border-radius: rem(8);
    font-size: rem(14);
    color: var(--muted-foreground);
    text-decoration: none;
    transition:
      background-color 0.15s ease,
      color 0.15s ease;

    @include hover {
      background-color: var(--accent);
      color: var(--foreground);
    }

    &--active {
      background-color: var(--accent);
      color: var(--foreground);
      font-weight: 600;
    }
  }

  &__content {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: rem(48);
  }

  &__section {
    scroll-margin-top: rem(24);
  }
}
</style>
