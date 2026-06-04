<script setup lang="ts">
import { computed } from 'vue';

// components
import VSpinner from '@common/components/VSpinner/VSpinner.vue';

// types
import { type ButtonProps, ButtonSizes, ButtonTypes, ButtonVariants, ButtonColors } from './VButton.types';

const props = withDefaults(defineProps<ButtonProps>(), {
  type: ButtonTypes.BUTTON,
  variant: ButtonVariants.SOLID,
  color: ButtonColors.PRIMARY,
  size: ButtonSizes.MD,
  iconOnly: false,
  isLoading: false,
  disabled: false,
});

const modifiers = computed(() => [
  props.variant && `--${props.variant}`,
  props.color && `--${props.color}`,
  props.size && `--${props.size}`,
  props.iconOnly && `--icon`,
]);
</script>

<template>
  <button class="button" :disabled="disabled || isLoading" :type="type" :class="modifiers">
    <VSpinner v-if="isLoading" />
    <slot v-else>{{ $t('ui.button.default') }}</slot>
  </button>
</template>

<style scoped lang="scss">
.button {
  --bg: var(--primary);
  --color: var(--primary-foreground);
  --padding: #{rem(6)} #{rem(10)};
  --border-color: transparent;
  --font-size: #{rem(13)};
  --line-height: #{rem(20)};

  background-color: var(--bg);
  color: var(--color);
  padding: var(--padding);
  font-size: var(--font-size);
  line-height: var(--line-height);
  box-shadow: inset 0 0 0 1px var(--border-color);
  border: none;
  border-radius: #{rem(8)};
  font-weight: 600;
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    opacity 0.2s ease,
    filter 0.2s ease;

  @include hover {
    filter: brightness(80%);
  }

  &:focus-visible {
    outline: rem(2) dashed var(--primary);
    outline-offset: rem(3);
  }

  :deep(svg) {
    font-size: var(--font-size);
  }

  &.--soft {
    --bg: color-mix(in srgb, var(--primary) 5%, transparent);
    --color: var(--primary);

    @include hover {
      filter: initial;
      --bg: color-mix(in srgb, var(--primary) 10%, transparent);
    }
  }

  &.--outline {
    --bg: transparent;
    --color: var(--primary);
    --border-color: var(--border);

    @include hover {
      filter: initial;
      background-color: var(--bg-button-primary);
    }
  }

  &.--subtle {
    --bg: color-mix(in srgb, var(--primary) 5%, transparent);
    --color: var(--primary);
    --border-color: var(--border);

    @include hover {
      filter: initial;
      --bg: color-mix(in srgb, var(--primary) 10%, transparent);
    }
  }

  &.--ghost {
    --bg: transparent;
    --color: var(--primary);

    @include hover {
      filter: initial;
      --bg: color-mix(in srgb, var(--primary) 10%, transparent);
    }
  }

  &.--link {
    --bg: transparent;
    --color: var(--muted-foreground);

    @include hover {
      --color: var(--foreground);
    }
  }

  &.--secondary {
    --bg: var(--secondary);
  }

  &.--destructive {
    --bg: var(--destructive);
    --color: var(--foreground);
  }

  &.--xs {
    --padding: #{rem(2)} #{rem(8)};
  }

  &.--sm {
    --padding: #{rem(4)} #{rem(12)};
  }

  &.--lg {
    --padding: #{rem(8)} #{rem(14)};
  }

  &.--xl {
    --padding: #{rem(10)} #{rem(16)};
  }

  &.--icon {
    --font-size: #{rem(16)};

    &.--xs {
      --padding: #{rem(4)};
    }
    &.--sm {
      --padding: #{rem(6)};
    }
    &.--md {
      --padding: #{rem(7.2)};
      --font-size: #{rem(17.6)};
    }
    &.--lg {
      --padding: #{rem(10)};
    }
  }

  &[disabled] {
    opacity: 0.35;
    pointer-events: none;
  }
}
</style>
