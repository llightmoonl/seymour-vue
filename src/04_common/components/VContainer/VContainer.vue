<script setup lang="ts">
import { computed } from 'vue';
import type { ContainerProps } from './VContainer';

const props = defineProps<ContainerProps>();

const sizeObject = computed(() => props.size ?? 'md');
</script>

<template>
  <div class="container" :class="sizeObject">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.container {
  max-width: 100%;
  margin-inline: auto;
  padding-inline: rem(16);
}
</style>
