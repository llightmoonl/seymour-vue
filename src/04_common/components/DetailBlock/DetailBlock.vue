<script setup lang="ts">
import { useSlots } from 'vue';
import { VTooltip, VMarkdown } from '@common/components';

defineProps<{
  marker: string;
}>()

const slots = useSlots();

const tooltipSlot = slots.tooltip?.()?.[0]?.children;
const tooltipContent = typeof tooltipSlot === 'string' ? tooltipSlot : '';
</script>

<template>
  <div class="detail-block">
    <div class="header">
      <p v-if="$slots.title" class="title">
        <slot name="title"></slot>:
      </p>
      <VTooltip class="tooltip" side="right" :side-offset="5">
        <template #trigger>
          <i-custom-info class="tooltip-trigger__icon" />
        </template>
        <template #content>
          <div v-if="$slots.tooltip">
            <VMarkdown :content="tooltipContent" />
          </div>
        </template>
      </VTooltip>
    </div>
    <div class="value">
      <span v-if="marker">{{marker}} = </span>
      <slot name="value"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@common/styles/helpers' as *;

.detail-block {
  display: flex;
  flex-direction: column;
  row-gap: rem(6);

  & .tooltip-trigger {
    &__icon {
      width: rem(20);
      height: rem(20);
      color: var(--text-tertiary);
    }
  }

  & .header {
    display: flex;
    column-gap: rem(8);
    justify-content: space-between;
  }

  & .title {
    font-size: rem(20);
    font-weight: 700;
  }

  & .value {
    font-size: rem(18);
  }
}
</style>
