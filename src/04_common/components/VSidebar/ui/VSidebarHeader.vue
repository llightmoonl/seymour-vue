<script setup lang="ts">
import { inject } from 'vue';
import { SidebarKey } from '../types/VSidebar.types';

const ctx = inject(SidebarKey);

if (!ctx) {
  throw new Error(`The component VSidebarHeader must be in the component VSidebar`);
}
</script>

<template>
  <div class="sidebar__header">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss"></style>
