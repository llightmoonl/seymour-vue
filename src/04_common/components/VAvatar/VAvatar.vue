<script setup lang="ts">
import { computed } from 'vue';
import type { AvatarProps } from './VAvatar.types';
import { AvatarImage, AvatarFallback, AvatarRoot } from 'reka-ui';

const props = defineProps<AvatarProps>();
const modifiers = computed(() => [props.size && `--${props.size}`]);
</script>

<template>
  <avatar-root class="avatar" :class="modifiers">
    <avatar-image class="avatar__image" :src="src" />
    <avatar-fallback class="avatar__fallback">{{ alt }}</avatar-fallback>
  </avatar-root>
</template>

<style scoped lang="scss">
.avatar {
  --size: #{rem(52)};

  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  user-select: none;
  width: var(--size);
  height: var(--size);
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
    background-color: var(--primary);
    color: var(--primary-foreground);
    border-radius: 100%;
    line-height: 1;
    font-weight: 500;
  }

  &.--3xs {
    --size: #{rem(36)};
    font-size: rem(16);
  }

  &.--2xs {
    --size: #{rem(40)};
    font-size: rem(16);
  }

  &.--xs {
    --size: #{rem(44)};
    font-size: rem(20);
  }

  &.--sm {
    --size: #{rem(48)};
    font-size: rem(20);
  }

  &.--lg {
    --size: #{rem(56)};
    font-size: rem(20);
  }

  &.--xl {
    --size: #{rem(60)};
    font-size: rem(20);
  }

  &.--2xl {
    --size: #{rem(64)};
    font-size: rem(22);
  }

  &.--3xl {
    --size: #{rem(68)};
    font-size: rem(24);
  }
}
</style>
