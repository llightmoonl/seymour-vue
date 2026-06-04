<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

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

import type { DropdownItem } from '@common/components/VDropdown/VDropdown.types.ts';

const { open, setOpen } = useSidebar();
const { t } = useI18n();

const sidebarElements = [
  { id: 1, title: t('sidebar.main.home'), href: '/', icon: HomeIcon },
  { id: 2, title: t('sidebar.main.docs'), href: '/docs', icon: DocsIcon },
  { id: 3, title: t('sidebar.main.research'), href: '/projects', icon: ProjectsIcon },
];

const profileSettingIsOpened = ref(false);
const profileSettings: DropdownItem[] = [
  { id: 1, icon: 'language', label: t('sidebar.profile.settings'), type: 'item' },
  { id: 2, icon: '', label: t('sidebar.profile.theme'), type: 'item' },
  { id: 3, icon: '', label: t('sidebar.profile.language'), type: 'item' },
  { id: 4, type: 'separator' },
  { id: 5, icon: '', label: t('sidebar.profile.admin'), type: 'item' },
  { id: 6, type: 'separator' },
  { id: 7, icon: '', label: t('sidebar.profile.logout'), type: 'item', danger: true },
];
</script>

<template>
  <v-sidebar-provider :open="open">
    <v-sidebar class="sidebar-app">
      <v-sidebar-header class="sidebar-app__header">
        <v-logo class="sidebar-app__logo" />
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
        <v-dropdown :items="profileSettings" v-model:open="profileSettingIsOpened" match-trigger-width>
          <template #trigger>
            <div class="sidebar-app__profile" :class="{ '--open': open }">
              <VAvatar
                class="sidebar-app__avatar"
                src="https://images.cybersport.ru/images/as-is/plain/23/234e7096-0e10-4ec8-b41b-7cd380bc9f67.png"
                alt="O" />
              <div v-if="open" class="sidebar-app__profile-info">
                <div class="sidebar-app__profile-name">Олег Скворцов</div>
                <div class="sidebar-app__profile-role">Администратор</div>
              </div>
              <i-custom-chevron-vertical v-if="open" class="sidebar-app__profile-vertical" />
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
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: rem(8);
    padding-block: rem(8);
    margin-bottom: rem(12);
    border-radius: rem(12);

    &.--open {
      padding-inline: rem(8);
    }

    @include hover() {
      background-color: var(--sidebar-accent);
    }

    &-info {
      flex: 1 1 0;
    }

    &-name {
      font-size: rem(14);
    }

    &-role {
      font-size: rem(12);
    }
  }

  &__menu {
    &-item {
      font-weight: 300;
    }
  }

  &__footer {
    & :deep(.dropdown__trigger) {
      inline-size: 100%;
    }
  }
}
</style>
