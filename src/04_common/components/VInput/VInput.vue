<script setup lang="ts">
import { computed } from 'vue';

// types
import { type InputProps, type InputEmits, InputVariants, InputColors, InputSizes, InputTypes } from './VInput.types';

const props = withDefaults(defineProps<InputProps>(), {
  variant: InputVariants.OUTLINE,
  color: InputColors.PRIMARY,
  size: InputSizes.MD,
  type: InputTypes.TEXT,
});
const emit = defineEmits<InputEmits>();

const model = defineModel<string | number>();
const updateInput = (value: string) => emit('update:modelValue', value);

const modifiers = computed(() => [
  props.variant && `--${props.variant}`,
  props.color && `--${props.color}`,
  props.size && `--${props.size}`,
]);
</script>

<template>
  <div class="input" :class="modifiers">
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
  --input-bg: var(--primary);
  --input-color: var(--primary-foreground);
  --input-padding: #{rem(9)} #{rem(12)};
  --input-border-color: transparent;
  --input-font-size: #{rem(16)};

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

  &__error {
    color: var(--destructive);
    font-weight: 600;
    font-size: rem(13);
    margin-inline: rem(12);
  }

  &__field {
    position: relative;
    width: 100%;
    padding: var(--input-padding);
    display: flex;
    justify-content: space-between;
    background-color: var(--input-bg);
    color: var(--input-color);
    border: 2px solid var(--input-border-color);
    border-radius: rem(8);
    font-size: var(--input-font-size);
    transition: border-color 0.25s ease-in-out;

    &::placeholder {
      color: rgba(255, 255, 255, 0.3);
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

  &:has(#{$item}__error) {
    #{$item} {
      &__title {
        color: var(--destructive);
      }
      &__field {
        border-color: var(--destructive);
      }
    }
  }

  &.--outline #{$item}__field {
    --input-bg: transparent;
    --input-color: var(--primary);
    --input-border-color: var(--input);
  }

  &.--soft #{$item}__field {
    --input-bg: color-mix(in srgb, var(--primary) 5%, transparent);
    --input-color: var(--primary);

    @include hover {
      filter: initial;
      --input-bg: color-mix(in srgb, var(--primary) 10%, transparent);
    }
  }

  &.--subtle #{$item}__field {
    --input-bg: color-mix(in srgb, var(--primary) 5%, transparent);
    --input-color: var(--primary);
    --input-border-color: var(--input);

    @include hover {
      filter: initial;
      --input-bg: color-mix(in srgb, var(--primary) 10%, transparent);
    }
  }

  &.--ghost #{$item}__field {
    --input-bg: transparent;
    --input-color: var(--primary);

    @include hover {
      filter: initial;
      --input-bg: color-mix(in srgb, var(--primary) 10%, transparent);
    }
  }

  &.--xs {
    --input-padding: #{rem(3.6)} #{rem(8)};
    --input-font-size: #{rem(12)};
  }

  &.--sm {
    --input-padding: #{rem(5.6)} #{rem(10)};
    --input-font-size: #{rem(12)};
  }

  &.--md {
    --input-padding: #{rem(6)} #{rem(10)};
    --input-font-size: #{rem(14)};
  }

  &.--lg {
    --input-padding: #{rem(7.2)} #{rem(10)};
    --input-font-size: #{rem(16)};
  }

  &.--xl {
    --input-padding: #{rem(9.2)} #{rem(10)};
    --input-font-size: #{rem(16)};
  }
}
</style>
