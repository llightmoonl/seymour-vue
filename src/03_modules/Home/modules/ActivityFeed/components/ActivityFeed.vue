<script setup lang="ts">
import { useQuery } from '@pinia/colada';
import ActivityFeedItem from '../components/ActivityFeedItem.vue';
import ActivityFeedItemSkeleton from '../components/ActivityFeedItemSkeleton.vue';
import { getActivity } from '@modules/Home/api/getActivity';

const { data, status } = useQuery({
  key: ['activity'],
  query: () => getActivity(1, 6),
});
</script>

<template>
  <div class="activity-feed">
    <div class="activity-feed__header">
      <div class="activity-feed__title">{{ $t('activity.title') }}</div>
    </div>
    <div class="activity-feed__list">
      <template v-if="status === 'pending'">
        <activity-feed-item-skeleton v-for="i in 4" :key="i" />
      </template>
      <template v-else-if="status === 'success' && data?.items.length">
        <activity-feed-item
          v-for="item in data.items"
          :key="item.id"
          :title="item.projectTitle"
          :type="item.type"
          :date="item.createdAt" />
      </template>
      <p v-else-if="status === 'success'" class="activity-feed__empty">{{ $t('activity.empty') }}</p>
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

  &__empty {
    font-size: rem(13);
    color: var(--muted-foreground);
  }
}
</style>
