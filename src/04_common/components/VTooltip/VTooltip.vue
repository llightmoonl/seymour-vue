<script setup lang="ts">
import { TooltipContent, TooltipPortal, TooltipProvider, TooltipRoot, TooltipTrigger } from 'reka-ui';
import { type TooltipProps, TooltipSides } from './VTooltip.types.ts';

withDefaults(defineProps<TooltipProps>(), {
  side: TooltipSides.BOTTOM,
});
</script>

<template>
  <tooltip-provider class="tooltip">
    <tooltip-root class="root">
      <tooltip-trigger class="trigger"><slot name="trigger"></slot></tooltip-trigger>
      <tooltip-portal class="portal">
        <tooltip-content class="content" :side="side" :side-offset="sideOffset">
          <slot name="content"></slot>
        </tooltip-content>
      </tooltip-portal>
    </tooltip-root>
  </tooltip-provider>
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
