import { useInfiniteQuery } from '@pinia/colada';
import { getAllProjects } from '@modules/Research/api/getAllProjects';

export function useAllProjects() {
  const { ...queries } = useInfiniteQuery({
    key: ['projects-list'],
    query: ({ pageParam }) => getAllProjects(pageParam, 20),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage?.pagination.hasNextPage ? lastPage?.pagination.currentPage + 1 : null),
  });

  return {
    ...queries,
  };
}
