<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import VButton from '@common/components/VButton/VButton.vue';
import VLogo from '@common/components/VLogo/VLogo.vue';
import VAvatar from '@common/components/VAvatar/VAvatar.vue';
import VDropdown from '@common/components/VDropdown/VDropdown.vue';

import VSidebarProvider from '@common/components/VSidebar/ui/VSidebarProvider.vue';
import VSidebarHeader from '@common/components/VSidebar/ui/VSidebarHeader.vue';
import VSidebar from '@common/components/VSidebar/ui/VSidebar.vue';
import VSidebarFooter from '@common/components/VSidebar/ui/VSidebarFooter.vue';
import VSidebarContent from '@common/components/VSidebar/ui/VSidebarContent.vue';
import VSidebarMenu from '@common/components/VSidebar/ui/VSidebarMenu.vue';
import VSidebarMenuItem from '@common/components/VSidebar/ui/VSidebarMenuItem.vue';

import { useSidebar } from '@common/components/VSidebar/composables/useSidebar';

import HomeIcon from '~icons/custom/home';
import DocsIcon from '~icons/custom/docs';
import ProjectsIcon from '~icons/custom/projects';
import SettingsIcon from '~icons/custom/settings';
import LanguageIcon from '~icons/custom/language';
import LogoutIcon from '~icons/custom/logout';
import ThemeIcon from '~icons/custom/theme';

import type { DropdownItem } from '@common/components/VDropdown/VDropdown.types.ts';
import { AvatarSizes } from '@common/components/VAvatar/VAvatar.types.ts';
import { LogoSizes } from '@common/components/VLogo/VLogo.types.ts';

import { useAuthStore } from '@modules/Auth/stores/useAuthStore';
import { useThemeStore } from '@modules/themes';
import { useLocaleStore } from '@modules/locale';

const { open, setOpen } = useSidebar();
const { t } = useI18n();
const router = useRouter();
const authStore = useAuthStore();
const themeStore = useThemeStore();
const localeStore = useLocaleStore();

const sidebarElements = [
  { id: 1, title: t('sidebar.main.home'), href: '/', icon: HomeIcon },
  { id: 2, title: t('sidebar.main.docs'), href: '/docs', icon: DocsIcon },
  { id: 3, title: t('sidebar.main.research'), href: '/projects', icon: ProjectsIcon },
];

const profileSettingIsOpened = ref(false);

const themeLabels: Record<string, string> = {
  light: t('sidebar.profile.theme-light'),
  dark: t('sidebar.profile.theme-dark'),
  system: t('sidebar.profile.theme-system'),
};
const themeOrder: Array<'light' | 'dark' | 'system'> = ['light', 'dark', 'system'];
const cycleTheme = () => {
  const cur = themeStore.theme as 'light' | 'dark' | 'system';
  const next = themeOrder[(themeOrder.indexOf(cur) + 1) % themeOrder.length]!;
  themeStore.setTheme(next);
};

const profileSettings = computed<DropdownItem[]>(() => [
  {
    id: 0,
    type: 'header',
    label: authStore.user?.email ?? '',
  },
  { id: 1, type: 'separator' },
  {
    id: 2,
    type: 'item',
    icon: SettingsIcon,
    label: t('sidebar.profile.settings'),
    onClick: () => router.push('/settings'),
  },
  {
    id: 3,
    type: 'item',
    icon: LanguageIcon,
    label: t('sidebar.profile.language'),
    meta: localeStore.locale === 'ru' ? 'RU' : 'EN',
    onClick: () => localeStore.setLocale(localeStore.locale === 'ru' ? 'en' : 'ru'),
  },
  {
    id: 4,
    type: 'item',
    icon: ThemeIcon,
    label: t('sidebar.profile.theme'),
    meta: themeLabels[themeStore.theme] ?? themeStore.theme,
    onClick: cycleTheme,
  },
  { id: 5, type: 'separator', hidden: !authStore.isAdmin },
  {
    id: 6,
    type: 'item',
    label: t('sidebar.profile.admin'),
    hidden: !authStore.isAdmin,
    onClick: () => router.push('/admin/users'),
  },
  {
    id: 7,
    type: 'item',
    hidden: !authStore.isAdmin,
    label: t('admin.docs.nav'),
    onClick: () => router.push('/admin/docs'),
  },
  { id: 8, type: 'separator', hidden: !authStore.isAdmin },
  {
    id: 9,
    type: 'item',
    icon: LogoutIcon,
    label: t('sidebar.profile.logout'),
    danger: true,
    onClick: async () => {
      await authStore.logout();
      router.push('/login');
    },
  },
]);

const avatarFallback = computed(() => (authStore.user?.name ?? '?').charAt(0).toUpperCase());
const roleLabel = computed(() => t(`roles.${authStore.user?.role ?? 'STUDENT'}`));
</script>

<template>
  <v-sidebar-provider :open="open">
    <v-sidebar class="sidebar-app">
      <v-sidebar-header class="sidebar-app__header">
        <v-logo :size="LogoSizes['3XS']" class="sidebar-app__logo" />
        <v-button class="sidebar-app__button" variant="ghost" @click="setOpen">
          <i-custom-panel-left class="sidebar-app__button-icon" />
        </v-button>
      </v-sidebar-header>
      <v-sidebar-content class="sidebar-app__content">
        <v-sidebar-menu class="sidebar-app__menu" :class="{ '--open': open }">
          <v-sidebar-menu-item
            class="sidebar-app__menu-item"
            v-for="element in sidebarElements"
            :key="element.id"
            :href="element.href"
            :title="element.title"
            :icon="element.icon"
            :opened="open" />
        </v-sidebar-menu>
      </v-sidebar-content>
      <v-sidebar-footer class="sidebar-app__footer">
        <v-dropdown
          :items="profileSettings"
          v-model:open="profileSettingIsOpened"
          :match-trigger-width="open"
          side="top"
          align="start">
          <template #trigger>
            <div class="sidebar-app__profile" :class="{ '--open': open }">
              <v-avatar
                class="sidebar-app__avatar"
                :src="authStore.avatarSrc"
                :alt="avatarFallback"
                :size="AvatarSizes['3XS']" />
              <Transition name="sidebar-info">
                <div v-if="open" class="sidebar-app__profile-info">
                  <div class="sidebar-app__profile-name">{{ authStore.user?.name }}</div>
                  <div class="sidebar-app__profile-role">{{ roleLabel }}</div>
                </div>
              </Transition>
              <Transition name="sidebar-info">
                <i-custom-chevron-vertical v-if="open" class="sidebar-app__profile-chevron" />
              </Transition>
            </div>
          </template>
        </v-dropdown>
      </v-sidebar-footer>
    </v-sidebar>
  </v-sidebar-provider>
</template>

<style scoped lang="scss">
.sidebar-app {
  border-right: 1px solid var(--sidebar-border);
  color: var(--sidebar-foreground);
  width: 100%;
  height: 100svh;
  left: 0;
  position: fixed;
  display: flex;
  flex-direction: column;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: rem(56);
  }

  &__button {
    padding: rem(7.2);

    &-icon {
      width: rem(20);
      height: rem(20);
    }
  }

  &__content {
    margin-top: rem(12);
    background-color: transparent;
    transition:
      max-width 0.2s ease,
      background-color 0.3s linear;
    flex: 1 0 0;
  }

  &__profile {
    width: 100%;
    display: flex;
    align-items: center;
    column-gap: rem(8);
    padding: rem(8) rem(6);
    margin-bottom: rem(12);
    border-radius: rem(8);
    transition: padding 0.2s ease;

    &.--open {
      padding-inline: rem(10);
    }

    @include hover() {
      background-color: var(--sidebar-accent);
    }

    &-info {
      flex: 1 1 0;
      min-width: 0;
      overflow: hidden;
    }

    &-name {
      font-size: rem(14);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &-role {
      font-size: rem(11);
      color: var(--muted-foreground);
      margin-top: rem(1);
      white-space: nowrap;
    }
  }

  &__profile-chevron {
    width: rem(16);
    height: rem(16);
    flex-shrink: 0;
    color: var(--muted-foreground);
  }

  &__menu {
    &-item {
      font-weight: 300;
    }
  }

  &__footer {
    & :deep(.dropdown__trigger) {
      display: block;
      width: 100%;
    }
  }
}

.sidebar-info-enter-active {
  transition: opacity 0.15s ease 0.1s;
}

.sidebar-info-leave-active {
  transition: opacity 0.08s ease;
}

.sidebar-info-enter-from,
.sidebar-info-leave-to {
  opacity: 0;
}
</style>
