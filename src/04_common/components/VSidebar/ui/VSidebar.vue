<script setup lang="ts">
import { computed, inject, provide } from 'vue';
import {
  SidebarCollapsible,
  SidebarKey,
  type SidebarProps,
  SidebarProviderKey,
  SidebarSide,
  SidebarVariants,
} from '../types/VSidebar.types.ts';

const ctx = inject(SidebarProviderKey);

provide(SidebarKey, {});

if (!ctx) {
  throw new Error(`The component VSidebar must be in the component VSidebarProvider`);
}

const props = withDefaults(defineProps<SidebarProps>(), {
  variant: SidebarVariants.SIDEBAR,
  collapsible: SidebarCollapsible.OFFCANVAS,
  side: SidebarSide.LEFT,
});

const modifiers = computed(() => [
  props.variant && `--${props.variant}`,
  props.collapsible && `--${props.collapsible}`,
  props.side && `--${props.side}`,
  ctx.open.value && '--open',
]);
</script>

<template>
  <div class="sidebar" :class="modifiers">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.sidebar {
  max-width: rem(53);
  z-index: 999;
  padding-inline: rem(8);
  color: var(--sidebar-foreground);

  &.--open {
    max-width: rem(290);
    padding-inline: rem(10);
    background-color: var(--sidebar);
    transition:
      max-width 0.2s ease,
      background-color 0.3s linear;
  }

  & .navigation {
    margin-top: rem(8);
  }
}
</style>
