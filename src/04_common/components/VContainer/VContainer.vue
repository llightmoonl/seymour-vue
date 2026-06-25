<script setup lang="ts">
import { computed } from 'vue';
import { type ContainerProps, ContainerSizes } from './VContainer.types';

const props = withDefaults(defineProps<ContainerProps>(), {
  size: ContainerSizes.MD,
});
const modifiers = computed(() => [props.size && `--${props.size}`]);
</script>

<template>
  <div class="container" :class="modifiers">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.container {
  max-width: 100%;
  margin-inline: auto;
  padding-inline: rem(16);

  &.--xs {
    max-width: rem(420);
  }

  &.--sm {
    max-width: rem(768);
  }

  &.--md {
    max-width: rem(1024);
  }

  &.--lg {
    max-width: rem(1440);
  }
}
</style>
