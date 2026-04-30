<script setup lang="ts">
import { VButton } from '@common/components';

import ProjectsItem from './ProjectsItem.vue';
import ProjectsListSkeleton from './ProjectsListSkeleton.vue';

import type { ProjectsListProps } from '../types/ProjectsList.types';
import { useProjectsList } from '../composables/useProjectsList';

defineProps<ProjectsListProps>();

const { projects, isLoading, isPending, hasNextPage, loadNextPage, projectTypes, projectUrl } = useProjectsList();
</script>

<template>
  <projects-list-skeleton v-if="isLoading || isPending" />
  <ul v-else class="projects-list">
    <projects-item
      v-for="item in projects"
      :key="item.id"
      :id="item.id"
      :title="item.title"
      :type="projectTypes[item.type]?.name ?? ''"
      :url="projectUrl(item.id, item.type)"
      :updated-at="item.updatedAt" />
    <v-button v-if="hasNextPage" class="projects-list__more" variant="outline" size="md" @click="loadNextPage">
      {{ $t('shared.show-more') }}
    </v-button>
  </ul>
</template>

<style scoped lang="scss">
.projects-list {
  overflow-y: auto;
  height: calc(100vh - 224px);
  padding-bottom: rem(64);

  &__more {
    margin-top: rem(16);
    width: 100%;
  }
}
</style>
