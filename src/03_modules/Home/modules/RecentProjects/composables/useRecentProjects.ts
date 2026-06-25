import { computed } from 'vue';
import { useQuery } from '@pinia/colada';

import { getProjects } from '@modules/Projects/api/getProjects';
import { PROJECTS_TYPES } from '../models/constants';
import type { ProjectsListItem } from '@modules/Projects/types/projects.types';

export function useRecentProjects() {
  const { data, ...queries } = useQuery({
    key: ['recent-projects'],
    query: () => getProjects({ page: 1, limit: 20 }),
  });

  const recentProjects = computed<ProjectsListItem[]>(() => {
    const items = data.value?.data ?? [];

    return items.map((item) => ({
      id: item.id,
      title: item.title,
      typeName: PROJECTS_TYPES[item.type]?.name ?? '',
      url: `/projects/${PROJECTS_TYPES[item.type]?.key ?? 'unknown'}/${item.id}`,
      updatedAt: item.updatedAt,
    }));
  });

  return {
    recentProjects,
    ...queries,
  };
}
