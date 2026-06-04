<script setup lang="ts">
import { inject } from 'vue';
import { SidebarKey } from '../types/VSidebar.types.ts';

const ctx = inject(SidebarKey);

if (!ctx) {
  throw new Error(`The component VSidebarFooter must be in the component VSidebar`);
}
</script>

<template>
  <div class="sidebar__footer">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss"></style>
