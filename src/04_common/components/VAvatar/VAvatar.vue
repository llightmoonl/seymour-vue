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
    background-color: white;
    color: var(--grass-11);
    font-size: 15px;
    line-height: 1;
    font-weight: 500;
  }

  &.--3xs {
    --size: #{rem(36)};
  }

  &.--2xs {
    --size: #{rem(40)};
  }

  &.--xs {
    --size: #{rem(44)};
  }

  &.--sm {
    --size: #{rem(48)};
  }

  &.--lg {
    --size: #{rem(56)};
  }

  &.--xl {
    --size: #{rem(60)};
  }

  &.--2xl {
    --size: #{rem(64)};
  }

  &.--3xl {
    --size: #{rem(68)};
  }
}
</style>
