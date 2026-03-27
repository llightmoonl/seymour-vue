import { useMutation } from '@pinia/colada';
import type { CompleteTabBody } from '../api/postCompleteTab.d';
import { postCompleteTab } from '../api/postCompleteTab.ts';

export function useCompleteTab(id: string, tab: string) {
  const { mutate, ...mutation } = useMutation({
    mutation: (params: CompleteTabBody) => postCompleteTab(id, params),
  });

  const completeTab = () => {
    mutate({ tab });
  };

  return {
    ...mutation,
    completeTab,
  };
}
