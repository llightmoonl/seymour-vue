<script setup lang="ts">
import VLogo from '@common/components/VLogo/VLogo.vue';
import VButton from '@common/components/VButton/VButton.vue';

import { useSidebar } from '../models/useSidebar.ts';

const { expanded, toggleExpanded } = useSidebar();
</script>

<template>
  <div class="sidebar__header">
    <VLogo v-if="expanded" />
    <VButton class="sidebar__button" variant="ghost" @click="toggleExpanded">
      <i-custom-panel-left class="sidebar__button-icon" />
    </VButton>
  </div>
</template>

<style scoped lang="scss">
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
    }
  }
}
</style>
