import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useInfiniteQuery } from '@pinia/colada';
import { getAllProjects } from '@modules/Projects/api/getAllProjects.ts';

import type { ProjectType } from '../types/ProjectsList.types';

export function useProjectsList() {
  const { t } = useI18n();

  const { data, ...queries } = useInfiniteQuery({
    key: ['projects-list'],
    query: ({ pageParam }) => getAllProjects(pageParam, 20),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage?.pagination.hasNextPage ? lastPage?.pagination.currentPage + 1 : null),
  });

  const projects = computed(() => {
    return data?.value?.pages.flatMap((value) => value.data) ?? [];
  });

  const projectTypes = computed<Record<number, ProjectType>>(() => ({
    0: {
      key: 'hebbian',
      name: t('shared.algorithms.hebbian'),
    },
    1: {
      key: 'delta',
      name: t('shared.algorithms.delta'),
    },
    2: {
      key: 'backpropagation',
      name: t('shared.algorithms.backpropagation'),
    },
  }));

  const projectUrl = (id: string, type: number) => `/projects/${projectTypes.value[type]?.key}/${id}`;

  return {
    projects,
    projectTypes,
    projectUrl,
    ...queries,
  };
}
