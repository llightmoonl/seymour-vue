<script setup lang="ts">
import { type SpinnerProps, SpinnerSizes } from './VSpinner.types.ts';

withDefaults(defineProps<SpinnerProps>(), {
  size: SpinnerSizes.MD,
});
</script>

<template>
  <div class="spinner" :class="size && `--${size}`"></div>
</template>

<style scoped lang="scss">
.spinner {
  --size: rem(18);
  display: inline-block;
  block-size: var(--size);
  inline-size: var(--size);
  vertical-align: middle;
  border: 2px solid currentColor;
  border-bottom-color: transparent;
  border-radius: 50%;
  animation: spinner 1s ease-in-out infinite;

  &.--xs {
    --size: rem(14);
  }

  &.--sm {
    --size: rem(16);
  }

  &.--lg {
    --size: rem(20);
  }

  &.--xl {
    --size: rem(22);
  }
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
