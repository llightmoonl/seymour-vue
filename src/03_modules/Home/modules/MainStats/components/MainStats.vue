<script setup lang="ts">
import { useQuery } from '@pinia/colada';
import MainStatsItem from './MainStatsItem.vue';
import VSkeleton from '@common/components/VSkeleton/VSkeleton.vue';
import { getDashboardSummary } from '@modules/Home/api/getDashboardSummary';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const { data, status } = useQuery({
  key: ['dashboard-summary'],
  query: getDashboardSummary,
});
</script>

<template>
  <div class="main-stats">
    <template v-if="status === 'success' && data">
      <main-stats-item :title="t('dashboard.stats.total')" :value="data.totalProjects" />
      <main-stats-item :title="t('dashboard.stats.trained')" :value="data.trained" />
      <main-stats-item :title="t('dashboard.stats.inProgress')" :value="data.inProgress" />
    </template>
    <template v-else-if="status === 'pending'">
      <v-skeleton v-for="i in 3" :key="i" class="main-stats__skeleton" />
    </template>
  </div>
</template>

<style scoped lang="scss">
.main-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: rem(12);

  &__skeleton {
    block-size: rem(80);
    border-radius: rem(8);
  }
}
</style>
