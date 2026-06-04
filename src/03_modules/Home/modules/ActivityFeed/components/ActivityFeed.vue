<script setup lang="ts">
import ActivityFeedItem from '../components/ActivityFeedItem.vue';
</script>

<template>
  <div class="activity-feed">
    <div class="activity-feed__header">
      <div class="activity-feed__title">{{ $t('activity.title') }}</div>
      <RouterLink to="/activity">{{ $t('activity.log') }}</RouterLink>
    </div>
    <activity-feed-item />
  </div>
</template>

<style scoped lang="scss">
.activity-feed {
  background-color: var(--card);
  padding: rem(8) rem(16);
  border-radius: rem(8);

  &__header {
    display: flex;
    justify-content: space-between;
  }
}
</style>
