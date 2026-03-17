<script setup lang="ts">
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
import { computed } from 'vue';

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
        <div class="select__title">
          {{ title }}
          <span v-if="required" class="select__required">*</span>
        </div>
        <SelectValue :placeholder="placeholder" class="select__value" />
        <chevron-down-icon class="select__icon"></chevron-down-icon>
      </SelectTrigger>
      <SelectContent :align="align" :side="side" :avoid-collisions="false" position="popper" :side-offset="10">
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
  --select-border-color: transparent;
  --select-font-size: #{rem(16)};

  &__title {
    position: absolute;
    top: rem(-13);
    left: rem(10);
    padding-inline: rem(6);
    background-color: var(--tg-theme-bg-color, #ffffff);
    font-weight: 600;
    font-size: rem(15);
    line-height: rem(22);
    transition: color 0.3s ease-in-out;
    white-space: nowrap;
  }

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

  &__required {
    color: var(--destructive);
  }

  &__item {
    background-color: var(--background);
    color: var(--foreground);
    padding: rem(12) rem(16);
    font-size: rem(16);
    line-height: rem(24);

    @include hover {
      outline: none;
      cursor: pointer;
    }

    &:focus,
    &:focus-visible {
      outline: none;
    }
  }

  &__icon {
    transition: transform 0.2s ease-in-out;
    transform: rotate(0deg);
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
    --select-padding: #{rem(3.6)} #{rem(8)};
    --select-font-size: #{rem(12)};
  }

  &__sm {
    --select-padding: #{rem(5.6)} #{rem(10)};
    --select-font-size: #{rem(12)};
  }

  &__md {
    --select-padding: #{rem(6)} #{rem(10)};
    --select-font-size: #{rem(14)};
  }

  &__lg {
    --select-padding: #{rem(7.2)} #{rem(10)};
    --select-font-size: #{rem(16)};
  }

  &__xl {
    --select-padding: #{rem(9.2)} #{rem(10)};
    --select-font-size: #{rem(16)};
  }
}

[data-reka-popper-content-wrapper] {
  width: var(--reka-popper-anchor-width);
  border-radius: 12px;
  overflow: hidden;
  box-shadow:
    0 0 2px 1px color-mix(in srgb, var(--tg-theme-text-color, #000000) 2%, transparent),
    0 32px 64px 0 color-mix(in srgb, var(--tg-theme-text-color, #000000) 4%, transparent);
}
</style>
