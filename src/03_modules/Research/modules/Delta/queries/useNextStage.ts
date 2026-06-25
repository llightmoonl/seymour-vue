import { useMutation, useQueryCache } from '@pinia/colada';

import type { NextStageBody } from '../api/types';
import { putNextStage } from '../api/putNextStage';

export function useNextStage(id: string) {
  const queryCache = useQueryCache();

  const { mutateAsync, ...mutation } = useMutation({
    mutation: (params: NextStageBody) => putNextStage(params),
    onSettled: () => {
      return queryCache.invalidateQueries({ key: ['delta'] });
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
