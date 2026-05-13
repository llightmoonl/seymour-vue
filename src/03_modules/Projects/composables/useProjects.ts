import { computed, type MaybeRefOrGetter, toValue } from 'vue';
import { useInfiniteQuery } from '@pinia/colada';

import { getProjects } from '../api/getProjects';
import { PROJECTS_TYPES } from '../models/constants';

import type { ProjectsListItem } from '../types/projects.types.ts';

export function useProjects(search: MaybeRefOrGetter<string>, filter: MaybeRefOrGetter<string>) {
  const { data, ...queries } = useInfiniteQuery({
    key: () => ['projects', toValue(search), toValue(filter)],
    query: ({ pageParam }) => getProjects(pageParam, 20, toValue(search), toValue(filter)),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage?.pagination.hasNextPage ? lastPage?.pagination.currentPage + 1 : null),
  });

  const projects = computed<ProjectsListItem[]>(() => {
    const items = data?.value?.pages.flatMap((value) => value.data) ?? [];

    return items.map((item) => ({
      id: item.id,
      title: item.title,
      typeName: PROJECTS_TYPES[item.type]?.name ?? '',
      url: `/projects/${PROJECTS_TYPES[item.type]?.key ?? 'unknown'}/${item.id}`,
      updatedAt: item.updatedAt,
    }));
  });

  return {
    projects,
    ...queries,
  };
}
