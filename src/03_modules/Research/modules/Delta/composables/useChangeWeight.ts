import { useMutation } from '@pinia/colada';
import { putChangeWeight } from '../api/putChangeWeight.ts';
import type { ChangeWeightBody } from '../api/types';

export function useChangeWeight(id: string) {
  const { mutateAsync, ...mutation } = useMutation({
    mutation: (params: ChangeWeightBody) => putChangeWeight(params),
  });

  const changeWeight = () => {
    return mutateAsync({ id });
  };

  return {
    ...mutation,
    changeWeight,
  };
}
