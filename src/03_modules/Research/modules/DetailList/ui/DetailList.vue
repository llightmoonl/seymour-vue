<script setup lang="ts">
import { DetailBlock } from '@modules/Research';
import type { DetailListProps } from '../DetailList';

defineProps<DetailListProps>();
</script>

<template>
  <div class="detail-list">
    <DetailBlock
      v-for="detail in details"
      :key="detail.id"
      :id="detail.id"
      :marker="detail.marker"
      :title="detail.title"
      :value="detail.value" />
  </div>
</template>

<style scoped lang="scss">
@use '@common/styles/helpers' as *;

.detail-list {
  display: flex;
  flex-direction: column;
  row-gap: rem(20);
}
</style>
