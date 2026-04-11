import { useQuery } from '@pinia/colada';
import { getProgressTabs } from '../api/getProgressTabs';

export function useProgressTabs(id: string) {
  const query = useQuery({
    key: ['progress-tabs', id],
    query: () => getProgressTabs(id),
  });

  return {
    ...query,
  };
}
