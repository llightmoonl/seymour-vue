<script setup lang="ts">
import type { VFormFieldProps } from './VFormField';
import { computed } from 'vue';

const props = defineProps<VFormFieldProps>();
const sizesObject = computed(() => (props.size ? `form-field__${props.size}` : 'form-field__md'));
</script>

<template>
  <div class="form-field" :class="sizesObject">
    <label v-if="title" class="form-field-label">
      {{ title }}
      <span v-if="required" class="form-field__required">*</span>
    </label>
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.form-field {
  $item: &;
  display: flex;
  flex-direction: column;
  row-gap: rem(4);

  &__required {
    color: var(--destructive, oklch(55.3% 0.197 29.5));
  }

  &-label {
    cursor: none;
    pointer-events: none;
  }

  &__xs {
    #{$item}-label {
      font-size: rem(12);
    }
  }

  &__sm {
    #{$item}-label {
      font-size: rem(12);
    }
  }

  &__md {
    #{$item}-label {
      font-size: rem(14);
    }
  }

  &__lg {
    #{$item}-label {
      font-size: rem(14);
    }
  }

  &__xl {
    #{$item}-label {
      font-size: rem(16);
    }
  }
}
</style>
