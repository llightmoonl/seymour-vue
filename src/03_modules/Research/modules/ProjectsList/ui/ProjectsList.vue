<script setup lang="ts">
import { computed } from 'vue';
import type { ProjectsListProps } from '../ProjectsList';
import { VButton } from '@common/components';
import { useAllProjects, ProjectsListItem, ProjectsListSkeleton } from '@modules/Research';

defineProps<ProjectsListProps>();

const { data: projects, isLoading, isPending, hasNextPage, loadNextPage } = useAllProjects();

const researchData = computed(() => {
  return projects?.value?.pages.flatMap((value) => value.data) ?? [];
});

const projectTypes: Record<number, string> = {
  0: 'hebbian',
  1: 'delta',
};

const url = (id: string, type: number) => `/projects/${projectTypes[type]}/${id ?? ''}`;
</script>

<template>
  <projects-list-skeleton v-if="isLoading || isPending" />
  <ul class="research__list">
    <projects-list-item
      v-for="(item, key) in researchData"
      :key="key"
      :id="item.id ?? 0"
      :title="item.title ?? ''"
      :type="item.type ?? ''"
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
