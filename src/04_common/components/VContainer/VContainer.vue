<script setup lang="ts">
import { computed } from 'vue';
import type { ContainerProps } from './VContainer';

const props = defineProps<ContainerProps>();

const sizeObject = computed(() => computed(() => props.size ?? 'outline'));
</script>

<template>
  <div class="container" :class="sizeObject">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
@use '@common/styles/helpers' as *;

.container {
  max-width: 100%;
  margin-inline: auto;
  padding-inline: rem(16);

  &.lg {
    max-width: rem(1440);
  }
}
</style>
