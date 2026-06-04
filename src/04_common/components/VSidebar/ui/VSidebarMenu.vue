<script setup lang="ts">
import { inject, provide } from 'vue';
import { SidebarKey, SidebarMenuKey } from '../types/VSidebar.types';

const ctx = inject(SidebarKey);

if (!ctx) {
  throw new Error(`The component VSidebarMenu must be in the component VSidebar`);
}

provide(SidebarMenuKey, {});
</script>

<template>
  <div class="sidebar-menu">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.sidebar-menu {
  display: flex;
  flex-direction: column;
  gap: rem(4);
}
</style>
