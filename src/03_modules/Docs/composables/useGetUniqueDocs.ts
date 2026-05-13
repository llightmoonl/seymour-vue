import { useQuery } from '@pinia/colada';
import { getUniqueDocs } from '../api/getUniqueDocs';
import { type ComputedRef, toValue } from 'vue';

export function useGetUniqueDocs(slug: ComputedRef<string | undefined>) {
  const query = useQuery({
    key: () => ['doc', toValue(slug)!],
    query: () => getUniqueDocs(toValue(slug)!),
    enabled: () => !!toValue(slug),
  });

  return {
    ...query,
  };
}
