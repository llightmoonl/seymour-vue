export interface ProjectCreate {
  id?: string;
  title: string;
  type: number;
  algorithmId?: number;
  createdAt?: string;
  updatedAt?: string;
}

export type ProjectCreateBody = Pick<ProjectCreateResponse, 'title' | 'type'>;

export type ProjectCreateResponse = Promise<ProjectCreate>;
