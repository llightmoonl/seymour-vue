import { type MaybeRefOrGetter } from 'vue';
import { useRouter } from 'vue-router';
import { useMutation } from '@pinia/colada';
import { postProjectCreate } from '../api/postProjectCreate';

const ALGORITHMS_TYPES = ['hebbian', 'delta', 'backpropagation'];

export function useProjectCreate(title: MaybeRefOrGetter, selectedAlgorithm: MaybeRefOrGetter) {
  const router = useRouter();

  const { mutate, ...mutation } = useMutation({
    mutation: (params: { title: string; type: number }) => postProjectCreate(params),
    onSuccess(data) {
      router.push(`/projects/${ALGORITHMS_TYPES[data.type]}/${data?.id}`);
    },
  });

  const createProject = () => {
    mutate({ title: title.value, type: selectedAlgorithm.value?.id ?? 0 });
  };

  return {
    ...mutation,
    createProject,
    selectedAlgorithm,
  };
}
