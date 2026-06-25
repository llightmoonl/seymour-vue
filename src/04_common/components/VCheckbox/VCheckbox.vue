<script setup lang="ts">
import { computed } from 'vue';
import { CheckboxIndicator, CheckboxRoot } from 'reka-ui';
import { type CheckboxProps, type CheckboxEmits, CheckboxColors, CheckboxSizes } from './VCheckbox.types';

const props = withDefaults(defineProps<CheckboxProps>(), {
  color: CheckboxColors.PRIMARY,
  size: CheckboxSizes.MD,
});

defineEmits<CheckboxEmits>();

const modifiers = computed(() => [props.color && `--${props.color}`, props.size && `--${props.size}`]);
</script>

<template>
  <checkbox-root
    class="checkbox"
    :class="modifiers"
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)">
    <checkbox-indicator class="checkbox__indicator">
      <i-custom-minus v-if="modelValue === 'indeterminate'" class="checkbox-icon" />
      <i-custom-check v-else class="checkbox-icon" />
    </checkbox-indicator>
  </checkbox-root>
</template>

<style scoped lang="scss">
.checkbox {
  $base: &;
  --size: #{rem(16)};
  --icon-size: #{rem(14)};

  background-color: color-mix(in srgb, var(--input) 30%, transparent);
  border: 1px solid var(--border);
  border-radius: rem(4);
  width: var(--size);
  height: var(--size);

  &:deep(svg) {
    width: var(--icon-size);
    height: var(--icon-size);
  }

  &.--xs {
    --size: #{rem(12)};
    --icon-size: #{rem(10)};
  }

  &.--sm {
    --size: #{rem(14)};
    --icon-size: #{rem(12)};
  }

  &.--md {
    --size: #{rem(16)};
    --icon-size: #{rem(14)};
  }

  &.--lg {
    --size: #{rem(18)};
    --icon-size: #{rem(16)};
  }

  &.--xl {
    --size: #{rem(20)};
    --icon-size: #{rem(18)};
  }
}
</style>
