<script setup lang="ts">
import { inject } from 'vue';
import { RouterLink } from 'vue-router';

import { SidebarMenuKey, type SidebarMenuItemProps } from '../types/VSidebar.types';

defineProps<SidebarMenuItemProps>();

const ctx = inject(SidebarMenuKey);

if (!ctx) {
  throw new Error(`The component VSidebarMenuItem must be in the component VSidebarMenu`);
}
</script>

<template>
  <router-link :to="href" class="sidebar-menu__item">
    <div class="sidebar-menu__content">
      <component v-if="icon" class="sidebar-menu__icon" :is="icon" />
      <span v-show="opened" class="sidebar-menu__title">{{ title }}</span>
    </div>
  </router-link>
</template>

<style scoped lang="scss">
.sidebar-menu {
  &__item {
    padding: rem(8);
    min-height: rem(36);
    border-radius: rem(8);
    font-size: rem(15);
    font-weight: 300;

    @include hover {
      background-color: var(--sidebar-accent);
    }

    &.router-link-exact-active {
      background-color: var(--sidebar-accent);
    }
  }

  &__content {
    display: inline-flex;
    vertical-align: middle;
    gap: 0.75rem;
  }

  &__icon {
    width: rem(20);
    height: rem(20);
  }
}
</style>
