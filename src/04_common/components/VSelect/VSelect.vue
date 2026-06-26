<script setup lang="ts">
import { computed } from 'vue';
import {
  type AcceptableValue,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectRoot,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from 'reka-ui';

// types
import { type SelectProps, type SelectModel, SelectVariants, SelectColors, SelectSizes } from './VSelect.types.ts';

// icons
import ChevronUpIcon from '~icons/custom/chevron-up.svg';
import ChevronDownIcon from '~icons/custom/chevron-down.svg';

const props = withDefaults(defineProps<SelectProps>(), {
  variant: SelectVariants.OUTLINE,
  color: SelectColors.PRIMARY,
  size: SelectSizes.MD,
});

const selectedValue = defineModel<SelectModel>('value');
const onSelect = (value: AcceptableValue) => (selectedValue.value = value);

const modifiers = computed(() => [
  props.variant && `--${props.variant}`,
  props.color && `--${props.color}`,
  props.size && `--${props.size}`,
]);
</script>

<template>
  <div class="select" :class="modifiers">
    <select-root v-model:value="selectedValue" class="select__root" @update:model-value="onSelect($event)">
      <select-trigger ref="selectTrigger" class="select__trigger">
        <select-value :placeholder="placeholder" class="select__value">
          <template
            v-if="selectedValue != null && typeof selectedValue === 'object' && 'name' in (selectedValue as object)">
            {{ (selectedValue as { name: string }).name }}
          </template>
        </select-value>
        <chevron-down-icon class="select__icon"></chevron-down-icon>
      </select-trigger>
      <select-content :align="align" :side="side" :avoid-collisions="false" position="popper" :side-offset="4">
        <select-scroll-up-button class="select__scroll-up">
          <chevron-up-icon></chevron-up-icon>
        </select-scroll-up-button>
        <select-viewport class="select__viewport">
          <select-item v-for="option in options" :key="option.id" :value="option" class="select__item">
            <select-item-text>{{ option.name }}</select-item-text>
          </select-item>
        </select-viewport>
        <select-scroll-down-button class="select__scroll-down">
          <chevron-down-icon></chevron-down-icon>
        </select-scroll-down-button>
      </select-content>
    </select-root>
    <div v-if="error" class="select__error">{{ error }}</div>
  </div>
</template>

<style scoped lang="scss">
.select {
  $item: &;
  --select-bg: var(--background);
  --select-color: var(--foreground);
  --select-border-color: var(--input);
  --select-padding: #{rem(9)} #{rem(12)};
  --select-font-size: #{rem(16)};
  --select-size-icon: #{rem(24)};

  &__trigger {
    position: relative;
    width: 100%;
    padding: var(--select-padding);
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--select-bg);
    color: var(--select-color);
    border: 2px solid var(--select-border-color);
    border-radius: rem(8);
    font-size: var(--select-font-size);
    transition:
      border-color 0.25s ease-in-out,
      color 0.25s ease-in-out;

    &[data-state='open'] {
      & > #{$item}__icon {
        transform: rotate(180deg);
      }
    }

    &:focus,
    &:focus-visible {
      outline: none;
    }
  }

  &:has(#{$item}__error) {
    #{$item}__trigger {
      border-color: var(--destructive);
    }
  }

  &__item {
    color: var(--popover-foreground);
    padding: var(--select-padding);
    font-size: var(--select-font-size);
    line-height: rem(24);
    width: 100%;
    border-radius: rem(8);

    @include hover {
      outline: none;
      cursor: pointer;
      background-color: var(--popover-foreground);
      color: var(--popover);
    }

    &:focus,
    &:focus-visible {
      outline: none;
    }
  }

  &__value {
    &[data-placeholder] {
      color: rgba(255, 255, 255, 0.3);
      font-weight: 300;
    }
  }

  &__icon {
    transition: transform 0.2s ease-in-out;
    transform: rotate(0deg);
    width: var(--select-size-icon);
    height: var(--select-size-icon);
  }

  &__error {
    color: var(--destructive);
    font-weight: 600;
    font-size: rem(13);
    margin-inline: rem(12);
    margin-top: rem(4);
  }

  &.--outline {
    #{$item}__trigger {
      --select-bg: transparent;
      --select-color: var(--popover-foreground);
      --select-border-color: var(--input);
    }
  }

  &.--soft {
    #{$item}__trigger {
      --select-bg: color-mix(in srgb, var(--popover-foreground) 5%, transparent);
      --select-color: var(--popover-foreground);

      @include hover {
        filter: initial;
        --select-bg: color-mix(in srgb, var(--popover-foreground) 10%, transparent);
      }
    }
  }

  &.--subtle {
    #{$item}__trigger {
      --select-bg: color-mix(in srgb, var(--popover-foreground) 5%, transparent);
      --select-color: var(--popover-foreground);
      --select-border-color: var(--border);

      @include hover {
        filter: initial;
        --select-bg: color-mix(in srgb, var(--popover-foreground) 10%, transparent);
      }
    }
  }

  &.--ghost {
    #{$item}__trigger {
      --select-bg: transparent;
      --select-color: var(--popover-foreground);

      @include hover {
        filter: initial;
        --select-bg: color-mix(in srgb, var(--popover-foreground) 10%, transparent);
      }
    }
  }

  &.--xs {
    --select-padding: #{rem(2.4)} #{rem(8)};
    --select-font-size: #{rem(12)};
    --select-size-icon: #{rem(16)};
  }

  &.--sm {
    --select-padding: #{rem(4.4)} #{rem(10)};
    --select-font-size: #{rem(12)};
    --select-size-icon: #{rem(16)};
  }

  &.--md {
    --select-padding: #{rem(4.4)} #{rem(10)};
    --select-font-size: #{rem(14)};
    --select-size-icon: #{rem(20)};
  }

  &.--lg {
    --select-padding: #{rem(7.2)} #{rem(10)};
    --select-font-size: #{rem(16)};
    --select-size-icon: #{rem(20)};
  }

  &.--xl {
    --select-padding: #{rem(9.2)} #{rem(10)};
    --select-font-size: #{rem(16)};
    --select-size-icon: #{rem(24)};
  }
}

[data-reka-popper-content-wrapper] {
  width: var(--reka-popper-anchor-width);
  border-radius: 12px;
  border: 1px solid var(--border);
  background-color: var(--background);
  overflow: clip;
  padding: rem(4);
}
</style>
