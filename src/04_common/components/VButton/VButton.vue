<script setup lang="ts">
import { computed } from 'vue';

// components
import { VSpinner } from '@common/components';

// types
import type { ButtonProps } from './VButton';

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'button',
  variant: 'solid',
  color: 'primary',
  size: 'md',
  isLoading: false,
  disabled: false,
});

const variantsObject = computed(() => (props.variant ? `button__${props.variant}` : 'button__outline'));
const colorsObject = computed(() => (props.color ? `button__${props.color}` : 'button__primary'));
const sizesObject = computed(() => (props.size ? `button__${props.size}` : 'button__md'));
</script>

<template>
  <button
    class="button"
    :disabled="disabled"
    :type="type"
    :class="[variantsObject, colorsObject, sizesObject]">
    <VSpinner v-if="isLoading" />
    <slot v-else>{{ $t('ui.button.default') }}</slot>
  </button>
</template>

<style scoped lang="scss">
.button {
  --btn-bg: var(--primary);
  --btn-color: var(--primary-foreground);
  --btn-padding: #{rem(9)} #{rem(12)};
  --btn-border-color: transparent;
  --btn-font-size: #{rem(16)};

  background-color: var(--btn-bg);
  color: var(--btn-color);
  padding: var(--btn-padding);
  font-size: var(--btn-font-size);
  box-shadow: inset 0 0 0 1px var(--btn-border-color);
  border: none;
  border-radius: #{rem(8)};
  font-weight: 600;
  transition: all 0.2s ease;

  @include hover {
    filter: brightness(80%);
  }

  &:focus-visible {
    outline: rem(2) dashed var(--primary);
    outline-offset: rem(3);
  }

  :deep(svg) {
    font-size: var(--btn-font-size);
  }

  &__soft {
    --btn-bg: color-mix(in srgb, var(--primary) 5%, transparent);
    --btn-color: var(--primary);

    @include hover {
      filter: initial;
      --btn-bg: color-mix(in srgb, var(--primary) 10%, transparent);
    }
  }

  &__outline {
    --btn-bg: transparent;
    --btn-color: var(--primary);
    --btn-border-color: var(--ring);

    @include hover {
      filter: initial;
      background-color: var(--bg-button-primary);
    }
  }

  &__subtle {
    --btn-bg: color-mix(in srgb, var(--primary) 5%, transparent);
    --btn-color: var(--primary);
    --btn-border-color: var(--ring);

    @include hover {
      filter: initial;
      --btn-bg: color-mix(in srgb, var(--primary) 10%, transparent);
    }
  }

  &__ghost {
    --btn-bg: transparent;
    --btn-color: var(--primary);

    @include hover {
      filter: initial;
      --btn-bg: color-mix(in srgb, var(--primary) 10%, transparent);
    }
  }

  &__link {
    --btn-bg: transparent;
    --btn-color: var(--muted);

    @include hover {
      --btn-color: var(--foreground);
    }
  }

  &__secondary {
    --btn-bg: var(--secondary);
  }

  &__neutral {
    --btn-bg: var(--neutral);
  }

  &__destructive {
    --btn-bg: var(--destructive);
    --btn-color: var(--foreground);
  }

  &__xs {
    --btn-padding: #{rem(4)} #{rem(8)};
    --btn-font-size: #{rem(13)};
  }

  &__sm {
    --btn-padding: #{rem(6)} #{rem(10)};
    --btn-font-size: #{rem(13)};
  }

  &__md {
    --btn-padding: #{rem(7.2)} #{rem(12)};
    --btn-font-size: #{rem(14)};
  }

  &__lg {
    --btn-padding: #{rem(7.6)} #{rem(14)};
    --btn-font-size: #{rem(16)};
  }

  &__icon-xs {
    --btn-padding: #{rem(4)};
    --btn-font-size: #{rem(16)};
  }

  &__icon-sm {
    --btn-padding: #{rem(6)};
    --btn-font-size: #{rem(16)};
  }

  &__icon-md {
    --btn-padding: #{rem(7.2)};
    --btn-font-size: #{rem(17.6)};
  }

  &__icon-lg {
    --btn-padding: #{rem(10)};
    --btn-font-size: #{rem(16)};
  }

  &[disabled] {
    opacity: 0.35;
    pointer-events: none;
  }
}
</style>
