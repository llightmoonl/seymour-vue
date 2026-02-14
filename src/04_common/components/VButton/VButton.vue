<script setup lang="ts">
import { computed } from 'vue';

// components
import { VSpinner } from '@common/components';

// types
import type { ButtonProps } from './VButton';

const props = defineProps<ButtonProps>();

const variantsObject = computed(() => props.variant ?? 'outline');
const colorsObject = computed(() => props.color ?? 'primary');
const sizesObject = computed(() => props.size ?? 'md');
const roundedObject = computed(() => props.rounded ?? 'md');
</script>

<template>
  <button
    class="button"
    :disabled="disabled"
    :type="type"
    :class="[variantsObject, colorsObject, sizesObject, roundedObject]">
    <VSpinner v-if="isLoading" />
    <slot v-else>{{ $t('ui.button.default') }}</slot>
  </button>
</template>

<style scoped lang="scss">
@use '@common/styles/helpers' as *;

.button {
  background-color: var(--bg-button-primary);
  color: var(--tg-theme-button-text-color, #ffffff);
  border: 2px solid transparent;
  border-radius: rem(8);
  padding: rem(9) rem(12);
  font-weight: 600;

  &.outline {
    background-color: var(--bg-button-outline);
    border-color: var(--bg-button-outline-border);

    @include hover {
      background-color: var(--surface-hover);
    }
  }

  &.ghost {
    background-color: transparent;

    @include hover {
      background-color: var(--surface-hover);
    }
  }

  &.icon {
    & svg {
      display: block;
    }
  }

  @include hover {
    background-color: var(--surface-hover);
  }

  &[disabled] {
    opacity: 0.35;
    pointer-events: none;
  }
}
</style>
