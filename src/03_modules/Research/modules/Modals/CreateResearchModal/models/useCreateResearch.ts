import { useMutation } from '@pinia/colada';
import { postCreateResearch } from '@modules/Research/modules/Modals/CreateResearchModal/api/postCreateResearch.ts';
import { useRouter } from 'vue-router';
import { type MaybeRefOrGetter } from 'vue';

const ALGORITHMS_TYPES = ['hebbian', 'delta'];

export function useCreateResearch(title: MaybeRefOrGetter, selectedAlgorithm: MaybeRefOrGetter) {
  const router = useRouter();

  const { mutate, ...mutation } = useMutation({
    mutation: (params: { title: string; type: number }) => postCreateResearch(params),
    onSuccess(data) {
      router.push(`/projects/${ALGORITHMS_TYPES[data.data.type]}/${data?.data?.id}`);
    },
  });

  const createResearch = () => {
    mutate({ title: title.value, type: selectedAlgorithm.value?.id ?? 0 });
  };

  return {
    ...mutation,
    createResearch,
    selectedAlgorithm,
  };
}
