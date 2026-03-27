<script setup lang="ts">
import { DetailBlock } from '@modules/Research';
import type { DetailListProps } from '../DetailList';
import { computed } from 'vue';

const props = defineProps<DetailListProps>();
const directionObject = computed(() => (props.direction ? `detail-list__${props.direction}` : 'detail-list__row'));
</script>

<template>
  <div class="detail-list" :class="directionObject">
    <DetailBlock
      v-for="detail in details"
      :key="detail.id"
      :id="detail.id"
      :formula="detail.formula"
      :marker="detail.marker"
      :title="detail.title"
      :value="detail.value" />
  </div>
</template>

<style scoped lang="scss">
.detail-list {
  display: flex;
  row-gap: rem(32);
  flex-wrap: wrap;

  &__column {
    flex-direction: column;

    & .detail-block {
      flex: 0;
    }
  }
}
</style>
