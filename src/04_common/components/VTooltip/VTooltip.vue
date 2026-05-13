<script setup lang="ts">
import { TooltipContent, TooltipPortal, TooltipProvider, TooltipRoot, TooltipTrigger } from 'reka-ui';
import type { TooltipBaseProps } from './VTooltip';

defineProps<TooltipBaseProps>();
</script>

<template>
  <TooltipProvider class="tooltip">
    <TooltipRoot class="root">
      <TooltipTrigger class="trigger"><slot name="trigger"></slot></TooltipTrigger>
      <TooltipPortal class="portal">
        <TooltipContent class="content" :side="side" :side-offset="sideOffset">
          <slot name="content"></slot>
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </TooltipProvider>
</template>

<style scoped lang="scss">
.trigger {
  background-color: transparent;
  border: none;
  appearance: none;
}

:deep(.content) {
  background-color: var(--accent);
  padding: rem(3) rem(8);
  border-radius: rem(4);
}
</style>
