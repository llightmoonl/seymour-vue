import type { MaybeRefOrGetter } from 'vue';
import { useMutation } from '@pinia/colada';

import type { RecognitionBody } from '../api/types';
import { postRecognition } from '../api/postRecognition.ts';

export function useRecognition(id: string, x: MaybeRefOrGetter) {
  const { mutateAsync, ...mutation } = useMutation({
    mutation: (params: RecognitionBody) => postRecognition(params),
  });

  const recognition = () => {
    return mutateAsync({ id, x: x.value.flat() });
  };

  return {
    ...mutation,
    recognition,
  };
}
