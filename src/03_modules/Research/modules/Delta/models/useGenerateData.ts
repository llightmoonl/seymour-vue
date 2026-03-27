import { useMutation } from '@pinia/colada';
import { putGenerateData } from '../api/putGenerateData.ts';
import type { GenerateDataBody } from '../api/putGenerateData.d';
import type { MaybeRefOrGetter } from 'vue';

export function useGenerateData(id: string, data: MaybeRefOrGetter) {
  const { mutate, ...mutation } = useMutation({
    mutation: (params: GenerateDataBody) => putGenerateData(params),
  });

  const generateData = () => {
    mutate({ id, data: data.value });
  };

  return {
    ...mutation,
    generateData,
  };
}
