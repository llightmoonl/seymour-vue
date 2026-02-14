<script setup lang="ts">
import { Logo, VButton } from '@common/components';
import { useSidebar } from '../models/useSidebar.ts';

const { expanded, toggleExpanded } = useSidebar();
</script>

<template>
  <div class="sidebar__header">
    <Logo v-if="expanded" />
    <VButton class="sidebar__button" variant="ghost" @click="toggleExpanded">
      <i-custom-panel-left class="sidebar__button-icon" />
    </VButton>
  </div>
</template>

<style scoped lang="scss">
@use '@common/styles/helpers' as *;

.sidebar {
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
      color: var(--text-tertiary);
    }
  }
}
</style>
