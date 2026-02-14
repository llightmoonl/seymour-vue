<script setup lang="ts">
import SidebarHeader from './SidebarHeader.vue';
import SidebarNavigation from './SidebarNavigation.vue';

import { useSidebar } from '../models/useSidebar.ts';

const { expanded } = useSidebar();
</script>

<template>
  <nav class="sidebar" :class="expanded ? 'expanded' : ''">
    <SidebarHeader />
    <SidebarNavigation class="navigation"/>
  </nav>
</template>

<style scoped lang="scss">
@use '@common/styles/helpers' as *;

.sidebar {
  max-width: rem(53);
  width: 100%;
  height: 100svh;
  background-color: transparent;
  transition: max-width 0.2s ease, background-color 0.3s linear;
  padding-inline: rem(8);
  border-right: 1px solid var(--border-light);

  &.expanded {
    max-width: rem(260);
    padding-inline: rem(10);
    background-color: var(--sidebar-bg-primary);
    transition: max-width 0.2s ease, background-color 0.3s linear;
  }

  & .navigation {
    margin-top: rem(8);
  }
}
</style>
