<script setup lang="ts">
import { RouterView } from 'vue-router';
import { SidebarMain } from '@modules/sidebar';
</script>

<template>
  <div class="layout">
    <SidebarMain />
    <div class="layout__view">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@common/styles/helpers' as *;

.layout {
  display: flex;

  &__view {
    padding-inline: rem(16);
    width: 100%;
  }
}
</style>
