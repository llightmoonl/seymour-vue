<script setup lang="ts">
import { computed } from 'vue';
import { CheckboxIndicator, CheckboxRoot } from 'reka-ui';
import type { CheckboxProps, CheckboxEmits } from './VCheckbox';

const props = withDefaults(defineProps<CheckboxProps>(), {
  color: 'primary',
  size: 'md',
});

defineEmits<CheckboxEmits>()

const colorsObject = computed(() => (props.color ? `checkbox__${props.color}` : 'checkbox__primary'));
const sizesObject = computed(() => (props.size ? `checkbox__${props.size}` : 'checkbox__md'));
</script>

<template>
  <CheckboxRoot class="checkbox" :class="[colorsObject, sizesObject]" :model-value="props.modelValue" @update:model-value="$emit('update:modelValue', $event)">
    <CheckboxIndicator class="checkbox__indicator">
      <i-custom-minus v-if="props.modelValue === 'indeterminate'" class="checkbox-icon" />
      <i-custom-check v-else class="checkbox-icon" />
    </CheckboxIndicator>
  </CheckboxRoot>
</template>

<style scoped lang="scss">
@use '@common/styles/helpers' as *;

.checkbox {
  $base: &;
  --size: #{rem(16)};
  --icon-size: #{rem(14)};

  background-color: color-mix(in srgb, var(--input) 30%, transparent);
  border: 1px solid var(--ring);
  border-radius: rem(4);
  width: var(--size);
  height: var(--size);

  &:deep(svg) {
    width: var(--icon-size);
    height: var(--icon-size);
  }

  &__xs {
    --size: #{rem(12)};
    --icon-size: #{rem(10)};
  }

  &__sm {
    --size: #{rem(14)};
    --icon-size: #{rem(12)};
  }

  &__md {
    --size: #{rem(16)};
    --icon-size: #{rem(14)};
  }

  &__lg {
    --size: #{rem(18)};
    --icon-size: #{rem(16)};
  }

  &__xl {
    --size: #{rem(20)};
    --icon-size: #{rem(18)};
  }
}
</style>
