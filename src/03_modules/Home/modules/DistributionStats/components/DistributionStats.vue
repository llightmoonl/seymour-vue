<script setup lang="ts">
import { computed } from 'vue';
import { useQuery } from '@pinia/colada';
import { useI18n } from 'vue-i18n';
import DistributionChart from '../components/DistributionChart.vue';
import VSkeleton from '@common/components/VSkeleton/VSkeleton.vue';
import { getDashboardSummary } from '@modules/Home/api/getDashboardSummary';

const { t } = useI18n();
const { data, status } = useQuery({
  key: ['dashboard-summary'],
  query: getDashboardSummary,
});

const getCount = (rule: string) => data.value?.distribution?.find((d) => d.rule === rule)?.count ?? 0;

const segments = computed(() => [
  { id: 1, title: t('dashboard.distribution.hebb'), value: getCount('HEBBIAN'), color: '#7bc47f' },
  { id: 2, title: t('dashboard.distribution.delta'), value: getCount('DELTA'), color: '#c9a96e' },
  { id: 3, title: t('dashboard.distribution.backprop'), value: getCount('BACKPROPAGATION'), color: '#90b8c8' },
]);
</script>

<template>
  <div class="distribution-stats">
    <div class="distribution-stats__title">{{ $t('dashboard.distribution.title') }}</div>
    <template v-if="status === 'success'">
      <distribution-chart class="distribution-stats__chart" :segments="segments" />
    </template>
    <v-skeleton v-else-if="status === 'pending'" class="distribution-stats__skeleton" />
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

  &__skeleton {
    block-size: rem(140);
    margin-block-start: rem(12);
  }
}
</style>
