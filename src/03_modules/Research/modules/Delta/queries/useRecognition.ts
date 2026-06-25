import type { MaybeRefOrGetter } from 'vue';
import { useMutation, useQueryCache } from '@pinia/colada';

import { postRecognition } from '../api/postRecognition.ts';
import type { RecognitionBody } from '../api/types.ts';

export function useRecognition(id: string, x: MaybeRefOrGetter) {
  const queryCache = useQueryCache();

  const { mutateAsync, ...mutation } = useMutation({
    mutation: (params: RecognitionBody) => postRecognition(params),
    onSettled: () => {
      return queryCache.invalidateQueries({ key: ['delta'] });
    },
  });

  const recognition = () => {
    return mutateAsync({ id, x: x.value.flat() });
  };

  return {
    ...mutation,
    recognition,
  };
}
