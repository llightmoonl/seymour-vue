import type { MaybeRefOrGetter } from 'vue';
import { useMutation, useQueryCache } from '@pinia/colada';

import type { RecognitionBody } from '../api/types.ts';
import { postRecognition } from '../api/postRecognition.ts';

export function useRecognition(id: string, x: MaybeRefOrGetter) {
  const queryCache = useQueryCache();

  const { mutateAsync, ...mutation } = useMutation({
    mutation: (params: RecognitionBody) => postRecognition(params),
    onSettled: () => {
      return queryCache.invalidateQueries({ key: ['hebbian'] });
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
