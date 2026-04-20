import { useInfiniteQuery } from '@pinia/colada';
import { getAllProjects } from '@modules/Projects/api/getAllProjects';
import { computed } from 'vue';

export function useAllProjects() {
  const { data, ...queries } = useInfiniteQuery({
    key: ['projects-list'],
    query: ({ pageParam }) => getAllProjects(pageParam, 20),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage?.pagination.hasNextPage ? lastPage?.pagination.currentPage + 1 : null),
  });

  const projects = computed(() => {
    return data?.value?.pages.flatMap((value) => value.data) ?? [];
  });

  return {
    projects,
    ...queries,
  };
}
