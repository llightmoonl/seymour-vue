import type { MaybeRefOrGetter } from 'vue';
import { useMutation, useQueryCache } from '@pinia/colada';
import { putGenerateData } from '../api/putGenerateData.ts';
import type { GenerateDataBody } from '../api/types.ts';

export function useGenerateData(id: string, data: MaybeRefOrGetter) {
  const queryCache = useQueryCache();

  const { mutateAsync, ...mutation } = useMutation({
    mutation: (params: GenerateDataBody) => putGenerateData(params),
    onSettled: () => {
      return queryCache.invalidateQueries({ key: ['delta'] });
    },
  });

  const generateData = () => {
    return mutateAsync({ id, data: data.value });
  };

  return {
    ...mutation,
    generateData,
  };
}
