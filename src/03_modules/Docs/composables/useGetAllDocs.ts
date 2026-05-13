import { useQuery } from '@pinia/colada';
import { getAllDocs } from '../api/getAllDocs.ts';

export function useGetAllDocs() {
  const query = useQuery({
    key: ['all-docs'],
    query: () => getAllDocs(),
  });

  return {
    ...query,
  };
}
