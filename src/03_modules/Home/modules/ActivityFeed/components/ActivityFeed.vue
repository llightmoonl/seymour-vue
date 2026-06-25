<script setup lang="ts">
import ActivityFeedItem from '../components/ActivityFeedItem.vue';
const items = [
  {
    id: 1,
    title: 'Хебба',
    type: 'start',
    date: '2026-06-10',
  },
  {
    id: 2,
    title: 'Хебба',
    type: 'end',
    date: '2026-06-10',
  },
  {
    id: 3,
    title: 'Хебба',
    type: 'end',
    date: '2026-06-10',
  },
  {
    id: 4,
    title: 'Хебба',
    type: 'end',
    date: '2026-06-10',
  },
  {
    id: 5,
    title: 'Хебба',
    type: 'end',
    date: '2026-06-10',
  },
  {
    id: 6,
    title: 'Хебба',
    type: 'end',
    date: '2026-06-10',
  },
];
</script>

<template>
  <div class="activity-feed">
    <div class="activity-feed__header">
      <div class="activity-feed__title">{{ $t('activity.title') }}</div>
      <RouterLink class="activity-feed__all" to="/activity">{{ $t('activity.log') }} →</RouterLink>
    </div>
    <div class="activity-feed__list">
      <activity-feed-item
        v-for="item in items"
        :key="item.id"
        :title="item.title"
        :type="item.type"
        :date="item.date" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.activity-feed {
  border: 1px solid var(--border);
  padding: rem(16) rem(14);
  border-radius: rem(8);

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    font-weight: 700;
  }

  &__list {
    margin-block-start: rem(20);
    display: flex;
    flex-direction: column;
    gap: rem(12);
  }

  &__all {
    font-size: rem(13);
    color: var(--muted-foreground);
  }
}
</style>
