<script setup lang="ts">
import { computed } from 'vue';
import { DetailBlock } from '../';
import type { DetailListProps } from '../DetailList';

const props = withDefaults(defineProps<DetailListProps>(), {
  direction: 'row',
});

const modifiers = computed(() => [props.direction && `--${props.direction}`]);
</script>

<template>
  <div class="detail-list" :class="modifiers">
    <detail-block v-for="detail in details" :key="detail.id" v-bind="detail" />
  </div>
</template>

<style scoped lang="scss">
.detail-list {
  display: grid;
  gap: rem(32) rem(16);
  grid-template-columns: repeat(4, 1fr);

  &.--column {
    grid-template-columns: 1fr;
    grid-auto-rows: 0fr;
  }
}
</style>
