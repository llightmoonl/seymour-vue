<script setup lang="ts">
import { timeAgo } from '@common/utils/timeAgo.ts';
import { useI18n } from 'vue-i18n';

defineProps<{
  title: string;
  type: string;
  date: string;
}>();

const activityTypes: Record<string, string> = {
  start: 'Запущено обучение',
  end: 'Завершено обучение',
};

const { locale } = useI18n();
</script>

<template>
  <div class="activity-feed-item">
    <div class="activity-feed-item__text">
      {{ activityTypes[type] }}
      <span class="activity-feed-item__title">{{ title }}</span>
    </div>
    <div class="activity-feed-item__date">
      {{ timeAgo(date, locale) }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.activity-feed-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: rem(14);

  &__title {
    font-weight: 700;
  }

  &__date {
    font-size: rem(13);
    color: var(--muted-foreground);
  }
}
</style>
