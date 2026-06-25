import { useQuery } from '@pinia/colada';
import { getDeltaData } from '../api/getDeltaData';
import type { DeltaData } from '../api/types';

export function useDeltaData(id: string) {
  const query = useQuery<DeltaData>({
    key: ['delta', id],
    query: () => getDeltaData(id),
  });

  return {
    ...query,
  };
}
