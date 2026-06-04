<script setup lang="ts">
import { AvatarImage, AvatarFallback, AvatarRoot } from 'reka-ui';
import type { AvatarProps } from './VAvatar';

defineProps<AvatarProps>();
</script>

<template>
  <AvatarRoot class="avatar">
    <AvatarImage class="avatar__image" :src="src" />
    <AvatarFallback class="avatar__fallback">{{ alt }}</AvatarFallback>
  </AvatarRoot>
</template>

<style scoped lang="scss">
.avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  user-select: none;
  width: 36px;
  height: 36px;
  border-radius: 100%;
  background-color: var(--black-a3);

  &__image {
    width: 100%;
    height: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: inherit;
  }

  &__fallback {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    color: var(--grass-11);
    font-size: 15px;
    line-height: 1;
    font-weight: 500;
  }
}
</style>
