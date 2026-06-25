<script setup lang="ts">
import { type LogoProps, LogoSizes } from './VLogo.types';

withDefaults(defineProps<LogoProps>(), {
  size: LogoSizes.MD,
});
</script>

<template>
  <i-custom-logo class="logo"></i-custom-logo>
</template>

<style scoped lang="scss">
.logo {
  --size: #{rem(48)};
  block-size: var(--size);
  inline-size: var(--size);

  &.--3xs {
    --size: #{rem(32)};
  }

  &.--2xs {
    --size: #{rem(36)};
  }

  &.--xs {
    --size: #{rem(40)};
  }

  &.--sm {
    --size: #{rem(44)};
  }

  &.--lg {
    --size: #{rem(52)};
  }

  &.--xl {
    --size: #{rem(56)};
  }

  &.--2xl {
    --size: #{rem(60)};
  }

  &.--3xl {
    --size: #{rem(64)};
  }
}
</style>
