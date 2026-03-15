<script setup lang="ts">
import type { InputEmits, InputProps } from './VInput';

defineProps<InputProps>();
const emit = defineEmits<InputEmits>();

const model = defineModel<string | number>();
const updateInput = (value: string) => emit('update:modelValue', value);
</script>
<template>
  <div class="input">
    <label v-if="title" :for="name" class="input__title">
      {{ title }}
      <span v-if="required" class="input__required">*</span>
    </label>
    <Component v-if="icon" class="input__icon" :is="icon" />
    <input
      v-model="model"
      @update:model-value="updateInput"
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
  display: flex;
  flex-direction: column;
  row-gap: rem(4);

  &:has(#{$item}__icon) {
    #{$item}__field {
      padding-left: rem(40);
    }
  }

  &__icon {
    position: absolute;
    left: rem(12);
    @include abs-y;
    width: rem(20);
    height: rem(20);
  }

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
    color: var(--destructive, oklch(55.3% 0.197 29.5));
  }

  &__error {
    color: var(--destructive, oklch(55.3% 0.197 29.5));
    font-weight: 600;
    font-size: rem(13);
    margin-inline: rem(12);
  }

  &__field {
    position: relative;
    width: 100%;
    padding: rem(8) rem(16);
    display: flex;
    justify-content: space-between;
    background-color: transparent;
    color: var(--foreground, --white-900);
    border: 2px solid var(--input, oklch(1 0 0 / 15%));
    border-radius: rem(8);
    font-size: rem(14);
    line-height: rem(24);
    transition: border-color 0.25s ease-in-out;

    &::placeholder {
      color: var(--tg-theme-hint-color, #a2acb0);
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
        color: var(--destructive, oklch(55.3% 0.197 29.5));
      }
      &__field {
        border-color: var(--destructive, oklch(55.3% 0.197 29.5));
      }
    }
  }
}
</style>
