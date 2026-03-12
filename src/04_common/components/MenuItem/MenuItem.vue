<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { type MenuItemProps } from './MenuItem';

defineProps<MenuItemProps>();
</script>

<template>
  <router-link :to="href" class="menu__item">
    <div class="content">
      <Component v-if="icon" class="icon" :is="icon" />
      <span v-show="expanded" class="title">{{ title }}</span>
    </div>
  </router-link>
</template>

<style scoped lang="scss">
.menu__item {
  padding: rem(8);
  min-height: rem(36);
  border-radius: rem(8);
  font-size: rem(15);
  font-weight: 300;

  @include hover {
    background-color: var(--surface-hover);
  }

  &.router-link-exact-active {
    background-color: var(--surface-active);
  }

  & .content {
    display: inline-flex;
    vertical-align: middle;
    gap: 0.75rem;
  }

  & .icon {
    width: rem(20);
    height: rem(20);
  }
}
</style>
