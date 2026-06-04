<script setup lang="ts">
import { inject } from 'vue';
import { SidebarKey } from '@common/components/VSidebar/types/VSidebar.types.ts';

const ctx = inject(SidebarKey);

if (!ctx) {
  throw new Error(`The component VSidebarContent must be in the component VSidebar`);
}
</script>

<template>
  <div class="sidebar__content">
    <slot />
  </div>
</template>

<style scoped lang="scss"></style>
