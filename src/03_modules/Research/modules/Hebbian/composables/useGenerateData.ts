import type { MaybeRefOrGetter } from 'vue';
import { useMutation } from '@pinia/colada';
import { putGenerateData } from '../api/putGenerateData.ts';
import type { GenerateDataBody } from '../api/types';

export function useGenerateData(id: string, data: MaybeRefOrGetter) {
  const { mutateAsync, ...mutation } = useMutation({
    mutation: (params: GenerateDataBody) => putGenerateData(params),
  });

  const generateData = () => {
    return mutateAsync({ id, data: data.value });
  };

  return {
    ...mutation,
    generateData,
  };
}
