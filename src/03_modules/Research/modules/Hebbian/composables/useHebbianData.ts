import { useQuery } from '@pinia/colada';
import { getHebbianData } from '../api/getHebbianData';
import type { HebbianData } from '../api/types';

export function useHebbianData(id: string) {
  const query = useQuery<HebbianData>({
    key: ['hebbian', id],
    query: () => getHebbianData(id),
  });

  return {
    ...query,
  };
}
