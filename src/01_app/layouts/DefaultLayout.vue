<script setup lang="ts">
import { RouterView } from 'vue-router';
import { SidebarApp } from '@modules/SidebarApp';
</script>

<template>
  <div class="default-layout">
    <sidebar-app />
    <div class="default-layout__view">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped lang="scss">
.default-layout {
  display: flex;
  margin-left: 40px;

  &__view {
    padding-inline: rem(16);
    width: 100%;
  }
}
</style>
