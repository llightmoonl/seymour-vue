<script setup lang="ts">
import { provide, toRef } from 'vue';
import { SidebarProviderKey, type SidebarProviderProps } from '../types/VSidebar.types.ts';

const props = withDefaults(defineProps<SidebarProviderProps>(), {
  open: false,
});

provide(SidebarProviderKey, {
  open: toRef(props, 'open'),
});
</script>

<template>
  <slot />
</template>

<style scoped lang="scss"></style>
