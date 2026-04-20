import { useQuery } from '@pinia/colada';
import { getHebbianData } from '../api/getHebbianData.ts';

export function useGetHebbianData(id: string) {
  const query = useQuery({
    key: ['hebbian-data', id],
    query: () => getHebbianData(id),
  });

  return {
    ...query,
  };
}
