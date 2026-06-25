<script setup lang="ts">
import { RecentProjectsList } from '@modules/Home/modules/RecentProjects';

const recentProjects = [
  {
    id: '1',
    title: 'Хебба',
    typeName: 'Правило Хебба',
    url: 'ewcwec',
    updatedAt: '12.11.2025',
  },
  {
    id: '2',
    title: 'Хебба2',
    typeName: 'Правило Хебба',
    url: 'ewcwec',
    updatedAt: '12.11.2025',
  },
  {
    id: '3',
    title: 'Хебба3',
    typeName: 'Правило Хебба',
    url: 'ewcwec',
    updatedAt: '12.11.2025',
  },
  {
    id: '3',
    title: 'Хебба3',
    typeName: 'Правило Хебба',
    url: 'ewcwec',
    updatedAt: '12.11.2025',
  },
  {
    id: '3',
    title: 'Хебба3',
    typeName: 'Правило Хебба',
    url: 'ewcwec',
    updatedAt: '12.11.2025',
  },
  {
    id: '3',
    title: 'Хебба3',
    typeName: 'Правило Хебба',
    url: 'ewcwec',
    updatedAt: '12.11.2025',
  },
  {
    id: '3',
    title: 'Хебба3',
    typeName: 'Правило Хебба',
    url: 'ewcwec',
    updatedAt: '12.11.2025',
  },
  {
    id: '3',
    title: 'Хебба3',
    typeName: 'Правило Хебба',
    url: 'ewcwec',
    updatedAt: '12.11.2025',
  },
  {
    id: '3',
    title: 'Хебба3',
    typeName: 'Правило Хебба',
    url: 'ewcwec',
    updatedAt: '12.11.2025',
  },
  {
    id: '3',
    title: 'Хебба3',
    typeName: 'Правило Хебба',
    url: 'ewcwec',
    updatedAt: '12.11.2025',
  },
];
</script>

<template>
  <div class="recent-projects">
    <div class="recent-projects__header">
      <div class="recent-projects__title">Мои проекты</div>
      <RouterLink class="recent-projects__all" to="/projects">Все проекты →</RouterLink>
    </div>
    <recent-projects-list class="recent-projects__list" :items="recentProjects" />
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
}
</style>
