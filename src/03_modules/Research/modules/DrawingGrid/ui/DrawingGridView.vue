<script setup lang="ts">
import DrawingGridBase from './DrawingGridBase.vue';
import type { DrawingGridViewProps } from '../DrawingGrid';

defineProps<DrawingGridViewProps>();
</script>

<template>
  <drawing-grid-base :grid="grid" :disabled="disabled" :size="size"></drawing-grid-base>
</template>

<style scoped lang="scss"></style>
