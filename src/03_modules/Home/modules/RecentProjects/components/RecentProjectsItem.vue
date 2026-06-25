<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import type { RecentProjectsListItem } from '../types/RecentProjectsList.types';
import { timeAgo } from '@common/utils/timeAgo';

defineProps<RecentProjectsListItem>();
const { locale } = useI18n();
</script>

<template>
  <li class="recent-projects-item">
    <a class="recent-projects-item__link" :href="url">
      <div class="recent-projects-item__left">
        <div class="recent-projects-item__title">{{ title }}</div>
        <div class="recent-projects-item__meta">
          {{ $t(typeName) }} · {{ $t('shared.updated', { time: timeAgo(updatedAt, locale) }) }}
        </div>
      </div>
    </a>
  </li>
</template>

<style scoped lang="scss">
.recent-projects-item {
  @include hover() {
    background-color: var(--accent);
    border-radius: rem(8);
  }

  &__information {
    display: flex;
    align-items: center;
    column-gap: rem(4);
  }

  &__link {
    padding: rem(8);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__left {
    display: flex;
    flex-direction: column;
    row-gap: rem(4);
  }

  &__title {
    font-size: rem(14);
    font-weight: 700;
  }

  &__meta {
    font-size: rem(11);
    color: var(--muted-foreground);
    font-weight: 500;
  }
}
</style>
