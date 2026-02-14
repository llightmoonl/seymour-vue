<script setup lang="ts">
import type { SpinnerProps } from './VSpinner';

defineProps<SpinnerProps>();
</script>

<template>
  <div :style="{ width: size, height: size }" class="spinner"></div>
</template>

<style scoped lang="scss">
@use '@common/styles/helpers' as *;

.spinner {
  display: inline-block;
  width: rem(18);
  height: rem(18);
  vertical-align: middle;
  border: 2px solid currentColor;
  border-bottom-color: transparent;
  border-radius: 50%;
  animation: spinner 1s ease-in-out infinite;
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
