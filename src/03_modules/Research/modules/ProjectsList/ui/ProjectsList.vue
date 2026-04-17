<script setup lang="ts">
import { VButton } from '@common/components';

import type { ProjectsListProps } from '../ProjectsList';
import { useAllProjects, ProjectsListItem, ProjectsListSkeleton } from '@modules/Research';
import { useI18n } from 'vue-i18n';

defineProps<ProjectsListProps>();
const { t } = useI18n();

const { projects, isLoading, isPending, hasNextPage, loadNextPage } = useAllProjects();

interface ProjectType {
  key: string;
  name: string;
}

const projectTypes: Record<number, ProjectType> = {
  0: {
    key: 'hebbian',
    name: t('shared.algorithms.hebbian'),
  },
  1: {
    key: 'delta',
    name: t('shared.algorithms.delta'),
  },
  2: {
    key: 'backpropagate',
    name: t('shared.algorithms.backpropagate'),
  },
};

const url = (id: string, type: number) => `/projects/${projectTypes[type]?.key}/${id ?? ''}`;
</script>

<template>
  <projects-list-skeleton v-if="isLoading || isPending" />
  <ul class="research__list">
    <projects-list-item
      v-for="(item, key) in projects"
      :key="key"
      :id="item.id ?? 0"
      :title="item.title ?? ''"
      :type="projectTypes[item.type]?.name ?? ''"
      :url="url(item?.id, item.type)"
      :datetime="item.updatedAt ?? ''" />
    <v-button v-if="hasNextPage" class="research__list-more" variant="outline" size="md" @click="loadNextPage">
      {{ $t('shared.show-more') }}
    </v-button>
  </ul>
</template>

<style scoped lang="scss">
.research__list {
  overflow-y: auto;
  height: calc(100vh - 224px);
  padding-bottom: rem(64);

  &-more {
    margin-top: rem(16);
    width: 100%;
  }
}
</style>
