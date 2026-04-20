import { useQuery } from '@pinia/colada';
import { getDeltaData } from '../api/getDeltaData.ts';

export function useGetDeltaData(id: string) {
  const query = useQuery({
    key: ['delta-data', id],
    query: () => getDeltaData(id),
  });

  return {
    ...query,
  };
}
