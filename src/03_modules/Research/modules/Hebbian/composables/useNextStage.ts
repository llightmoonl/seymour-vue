import { useMutation, useQueryCache } from '@pinia/colada';

import type { NextStageBody } from '../api/types.ts';
import { putNextStage } from '../api/putNextStage';

export function useNextStage(id: string) {
  const queryCache = useQueryCache();

  const { mutateAsync, ...mutation } = useMutation({
    mutation: (params: NextStageBody) => putNextStage(params),
    onSettled: () => {
      return queryCache.invalidateQueries({ key: ['hebbian'] });
    },
  });

  const nextStage = () => {
    return mutateAsync({ id });
  };

  return {
    ...mutation,
    nextStage,
  };
}
