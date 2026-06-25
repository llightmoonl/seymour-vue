<script setup lang="ts">
import { RecentProjectsList, RecentProjectsListSkeleton } from '@modules/Home/modules/RecentProjects';
import { useRecentProjects } from '../composables/useRecentProjects';

const { recentProjects, isLoading, status } = useRecentProjects();
</script>

<template>
  <div class="recent-projects">
    <div class="recent-projects__header">
      <div class="recent-projects__title">{{ $t('dashboard.projects.title') }}</div>
      <RouterLink class="recent-projects__all" to="/projects">{{ $t('dashboard.projects.all') }}</RouterLink>
    </div>
    <template v-if="isLoading">
      <recent-projects-list-skeleton class="recent-projects__list" />
    </template>
    <template v-else-if="recentProjects.length">
      <recent-projects-list class="recent-projects__list" :items="recentProjects" />
    </template>
    <p v-else-if="status === 'success'" class="recent-projects__empty">{{ $t('dashboard.projects.empty') }}</p>
  </div>
</template>

<style scoped lang="scss">
.recent-projects {
  border: 1px solid var(--border);
  padding: rem(16) rem(8) rem(8);
  border-radius: rem(8);

  &__title {
    font-weight: 700;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-inline: rem(6);
  }

  &__list {
    margin-block-start: rem(12);
  }

  &__all {
    font-size: rem(13);
    color: var(--muted-foreground);
  }

  &__empty {
    margin-block-start: rem(12);
    padding-inline: rem(8);
    font-size: rem(13);
    color: var(--muted-foreground);
  }
}
</style>
