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
// import { ChevronDown, ChevronUp } from 'lucide-vue-next';

defineProps<SelectProps>();
const selectedValue = defineModel<SelectModel>('value');
const onSelect = (value: AcceptableValue) => (selectedValue.value = value);
</script>

<template>
  <div class="select">
    <SelectRoot v-model:value="selectedValue" @update:modelValue="onSelect($event)" class="select__root">
      <SelectTrigger ref="selectTrigger" class="select__trigger">
        <div class="select__title">
          {{ title }}
          <span v-if="required" class="select__required">*</span>
        </div>
        <SelectValue :placeholder="placeholder" class="select__value" />
      </SelectTrigger>
      <SelectContent :align="align" :side="side" :avoid-collisions="false" position="popper" :side-offset="10">
        <SelectScrollUpButton class="select__scroll-up">
        </SelectScrollUpButton>
        <SelectViewport class="select__viewport">
          <SelectItem v-for="option in options" :value="option" :key="option.id" class="select__item">
            <SelectItemText>{{ option.name }}</SelectItemText>
          </SelectItem>
        </SelectViewport>
        <SelectScrollDownButton class="select__scroll-down">
        </SelectScrollDownButton>
      </SelectContent>
    </SelectRoot>
    <div v-if="error" class="select__error">{{ error }}</div>
  </div>
</template>

<style scoped lang="scss">
@use '@common/styles/helpers' as *;

.select {
  $item: &;

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
    margin-top: rem(13);
    position: relative;
    width: 100%;
    padding: rem(14) rem(16);
    display: flex;
    justify-content: space-between;
    background-color: transparent;
    color: var(--tg-theme-text-color, #000000);
    border: 2px solid color-mix(in srgb, var(--tg-theme-text-color, #000000) 5%, transparent);
    border-radius: rem(14);
    font-size: rem(16);
    line-height: rem(24);
    transition:
      border-color 0.25s ease-in-out,
      color 0.25s ease-in-out;

    &[data-state='open'] {
      border-color: var(--tg-theme-button-color, #007aff);

      #{$item}__title {
        color: var(--tg-theme-button-color, #007aff);
      }

      & > #{$item}__icon {
        transform: rotate(180deg);
      }
    }

    #{$item}__title,
    & [data-placeholder],
    & svg {
      color: var(--tg-theme-hint-color, #a2acb0);
    }

    &:focus,
    &:focus-visible {
      outline: none;
    }
  }

  &:has(#{$item}__error) {
    #{$item}__trigger {
      border-color: var(--tg-theme-destructive-text-color, #ec3942);
    }
    #{$item}__title {
      color: var(--tg-theme-destructive-text-color, #ec3942);
    }
  }

  &__required {
    color: var(--tg-theme-destructive-text-color, #ec3942);
  }

  &__item {
    background-color: var(--tg-theme-bg-color, #ffffff);
    color: var(--tg-theme-text-color, #000000);
    padding: rem(12) rem(16);
    font-size: rem(16);
    line-height: rem(24);

    @include hover {
      outline: none;
      background-color: var(--tg-theme-button-color, #007aff);
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
