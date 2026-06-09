import { useQuery } from '@pinia/colada';
import { getHebbianData } from '../api/getHebbianData.ts';
import type { HebbianData } from '@modules/Research/modules/Hebbian/api/types.ts';

export function useHebbianData(id: string) {
  const query = useQuery<HebbianData>({
    key: ['hebbian', id],
    query: () => getHebbianData(id),
  });

  return {
    ...query,
  };
}
