import type { ProjectType } from '../types/projects.types.ts';

export const PROJECTS_TYPES: Record<number, ProjectType> = {
  0: {
    key: 'hebbian',
    name: 'shared.algorithms.hebbian',
  },
  1: {
    key: 'delta',
    name: 'shared.algorithms.delta',
  },
  2: {
    key: 'backpropagation',
    name: 'shared.algorithms.backpropagation',
  },
};
