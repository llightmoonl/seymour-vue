<script setup lang="ts">
//types
import type { InputProps } from './VInput';

defineProps<InputProps>();
const model = defineModel<string | number>();
</script>
<template>
  <div class="input">
    <label v-if="title" :for="name" class="input__title">
      {{ title }}
      <span v-if="required" class="input__required">*</span>
    </label>
    <input
      v-model="model"
      class="input__field"
      :type="type"
      :inputmode="inputmode"
      :id="name"
      :name="name"
      :placeholder="placeholder"
      autocomplete="off" />
    <div v-if="error" class="input__error">{{ error }}</div>
  </div>
</template>

<style scoped lang="scss">
.input {
  $item: &;
  position: relative;
  margin-top: rem(13);
  display: flex;
  flex-direction: column;
  row-gap: rem(4);

  &__title {
    display: flex;
    column-gap: rem(4);
    position: absolute;
    top: 0;
    left: rem(10);
    padding-inline: rem(6);
    background-color: var(--tg-theme-bg-color, #ffffff);
    font-weight: 600;
    font-size: rem(15);
    line-height: rem(22);
    color: var(--tg-theme-hint-color, #a2acb0);
    z-index: 1;
    white-space: nowrap;
    transition: color 0.25s ease-in-out;
  }

  &__required {
    color: var(--tg-theme-destructive-text-color, #ec3942);
  }

  &__error {
    color: var(--tg-theme-destructive-text-color, #ec3942);
    font-weight: 600;
    font-size: rem(13);
    margin-inline: rem(12);
  }

  &__field {
    margin-top: rem(12);
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
    transition: border-color 0.25s ease-in-out;

    &::placeholder {
      color: var(--tg-theme-hint-color, #a2acb0);
    }

    &:active,
    &:focus,
    &:focus-within {
      border-color: var(--tg-theme-button-color, #007aff);
    }

    &:focus-visible {
      outline: none;
    }

    &[type='number'] {
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      -moz-appearance: textfield;
    }
  }

  &:focus-within &__title {
    color: var(--tg-theme-button-color, #007aff);
  }

  &:has(#{$item}__error) {
    #{$item} {
      &__title {
        color: var(--tg-theme-destructive-text-color, #ec3942);
      }
      &__field {
        border-color: var(--tg-theme-destructive-text-color, #ec3942);
      }
    }
  }
}
</style>
