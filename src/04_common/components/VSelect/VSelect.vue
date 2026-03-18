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

//types
import type { SelectProps, SelectModel } from './VSelect';

// icons
import ChevronUpIcon from '~icons/custom/chevron-up.svg';
import ChevronDownIcon from '~icons/custom/chevron-down.svg';

const props = defineProps<SelectProps>();
const selectedValue = defineModel<SelectModel>('value');
const onSelect = (value: AcceptableValue) => (selectedValue.value = value);

const variantsObject = computed(() => (props.variant ? `select__${props.variant}` : 'select__outline'));
const colorsObject = computed(() => (props.color ? `select__${props.color}` : 'select__primary'));
const sizesObject = computed(() => (props.size ? `select__${props.size}` : 'select__md'));
</script>

<template>
  <div class="select" :class="[variantsObject, colorsObject, sizesObject]">
    <SelectRoot v-model:value="selectedValue" @update:modelValue="onSelect($event)" class="select__root">
      <SelectTrigger ref="selectTrigger" class="select__trigger">
        <SelectValue :placeholder="placeholder" class="select__value" />
        <chevron-down-icon class="select__icon"></chevron-down-icon>
      </SelectTrigger>
      <SelectContent :align="align" :side="side" :avoid-collisions="false" position="popper" :side-offset="4">
        <SelectScrollUpButton class="select__scroll-up">
          <chevron-up-icon></chevron-up-icon>
        </SelectScrollUpButton>
        <SelectViewport class="select__viewport">
          <SelectItem v-for="option in options" :value="option" :key="option.id" class="select__item">
            <SelectItemText>{{ option.name }}</SelectItemText>
          </SelectItem>
        </SelectViewport>
        <SelectScrollDownButton class="select__scroll-down">
          <chevron-down-icon></chevron-down-icon>
        </SelectScrollDownButton>
      </SelectContent>
    </SelectRoot>
    <div v-if="error" class="select__error">{{ error }}</div>
  </div>
</template>

<style scoped lang="scss">
.select {
  $item: &;
  --select-bg: var(--primary);
  --select-color: var(--primary-foreground);
  --select-padding: #{rem(9)} #{rem(12)};
  --select-border-color: var(--ring);
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
    color: var(--foreground);
    padding: var(--select-padding);
    font-size: var(--select-font-size);
    line-height: rem(24);
    width: 100%;
    border-radius: rem(8);

    @include hover {
      outline: none;
      cursor: pointer;
      background-color: var(--foreground);
      color: var(--background);
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
    color: var(--tg-theme-destructive-text-color, #ec3942);
    font-weight: 600;
    font-size: rem(13);
    margin-inline: rem(12);
    margin-top: rem(4);
  }

  &__outline {
    & #{$item}__trigger {
      --select-bg: transparent;
      --select-color: var(--primary);
      --select-border-color: var(--ring);
    }
  }

  &__soft {
    & #{$item}__trigger {
      --select-bg: color-mix(in srgb, var(--primary) 5%, transparent);
      --select-color: var(--primary);

      @include hover {
        filter: initial;
        --select-bg: color-mix(in srgb, var(--primary) 10%, transparent);
      }
    }
  }

  &__subtle {
    & #{$item}__trigger {
      --select-bg: color-mix(in srgb, var(--primary) 5%, transparent);
      --select-color: var(--primary);
      --select-border-color: var(--ring);

      @include hover {
        filter: initial;
        --select-bg: color-mix(in srgb, var(--primary) 10%, transparent);
      }
    }
  }

  &__ghost {
    & #{$item}__trigger {
      --select-bg: transparent;
      --select-color: var(--primary);

      @include hover {
        filter: initial;
        --select-bg: color-mix(in srgb, var(--primary) 10%, transparent);
      }
    }
  }

  &__xs {
    --select-padding: #{rem(2.4)} #{rem(8)};
    --select-font-size: #{rem(12)};
    --select-size-icon: #{rem(16)};
  }

  &__sm {
    --select-padding: #{rem(4.4)} #{rem(10)};
    --select-font-size: #{rem(12)};
    --select-size-icon: #{rem(16)};
  }

  &__md {
    --select-padding: #{rem(4.4)} #{rem(10)};
    --select-font-size: #{rem(14)};
    --select-size-icon: #{rem(20)};
  }

  &__lg {
    --select-padding: #{rem(7.2)} #{rem(10)};
    --select-font-size: #{rem(16)};
    --select-size-icon: #{rem(20)};
  }

  &__xl {
    --select-padding: #{rem(9.2)} #{rem(10)};
    --select-font-size: #{rem(16)};
    --select-size-icon: #{rem(24)};
  }
}

[data-reka-popper-content-wrapper] {
  width: var(--reka-popper-anchor-width);
  border-radius: 12px;
  border: 1px solid var(--ring);
  background-color: var(--background);
  overflow: clip;
  padding: rem(4);
}
</style>
