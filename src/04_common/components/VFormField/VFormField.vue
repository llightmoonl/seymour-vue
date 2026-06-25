<script setup lang="ts">
import { computed } from 'vue';
import { FormFieldSizes, type VFormFieldProps } from './VFormField.types';

const props = withDefaults(defineProps<VFormFieldProps>(), {
  size: FormFieldSizes.MD,
  required: false,
  hideError: false,
});
const modifiers = computed(() => [props.size && `--${props.size}`, props.error && `--error`]);
</script>

<template>
  <div class="form-field" :class="modifiers">
    <label v-if="title" class="form-field-label">
      {{ title }}
      <span v-if="required" class="form-field__required">*</span>
    </label>
    <slot></slot>
    <div v-if="error && !hideError" class="form-field__error">{{ error }}</div>
  </div>
</template>

<style scoped lang="scss">
.form-field {
  $item: &;
  display: flex;
  flex-direction: column;
  row-gap: rem(4);

  &__required {
    color: var(--destructive);
  }

  &-label {
    cursor: none;
    pointer-events: none;
    color: var(--muted-foreground);
  }

  &.--xs {
    #{$item}-label {
      font-size: rem(12);
    }
  }

  &.--sm {
    #{$item}-label {
      font-size: rem(12);
    }
  }

  &.--md {
    #{$item}-label {
      font-size: rem(14);
    }
  }

  &.--lg {
    #{$item}-label {
      font-size: rem(14);
    }
  }

  &.--xl {
    #{$item}-label {
      font-size: rem(16);
    }
  }

  &.--error {
    :deep(.input) {
      border-color: var(--destructive);
    }
    :deep(.checkbox) {
      background-color: var(--destructive);
    }
  }

  &__error {
    color: var(--destructive);
    font-weight: 600;
    font-size: rem(13);
  }
}
</style>
