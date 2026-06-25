<script setup lang="ts">
import DistributionChart from '../components/DistributionChart.vue';
const segments = [
  { id: 1, title: 'Правило Хебба', value: 4, color: '#7bc47f' },
  { id: 2, title: 'Дельта-правило', value: 3, color: '#c9a96e' },
  { id: 3, title: 'Обратное распространение', value: 3, color: '#90b8c8' },
];
</script>

<template>
  <div class="distribution-stats">
    <div class="distribution-stats__title">Распределение</div>
    <distribution-chart class="distribution-stats__chart" :segments="segments" />
  </div>
</template>

<style scoped lang="scss">
.distribution-stats {
  border: 1px solid var(--border);
  padding: rem(16) rem(28) rem(16) rem(14);
  border-radius: rem(8);

  &__title {
    font-weight: 700;
  }

  &__chart {
    margin-block-start: rem(12);
  }
}
</style>
