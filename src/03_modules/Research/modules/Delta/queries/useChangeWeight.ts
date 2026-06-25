import { useMutation, useQueryCache } from '@pinia/colada';
import { putChangeWeight } from '../api/putChangeWeight.ts';
import type { ChangeWeightBody } from '../api/types.ts';

export function useChangeWeight(id: string) {
  const queryCache = useQueryCache();

  const { mutateAsync, ...mutation } = useMutation({
    mutation: (params: ChangeWeightBody) => putChangeWeight(params),
    onSettled: () => {
      return queryCache.invalidateQueries({ key: ['delta'] });
    },
  });

  const changeWeight = () => {
    return mutateAsync({ id });
  };

  return {
    ...mutation,
    changeWeight,
  };
}
