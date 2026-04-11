export interface CreateResearch {
  id?: string;
  title: string;
  type: number;
  algorithmId?: number;
  createdAt?: string;
  updatedAt?: string;
}

export type CreateResearchBody = Pick<CreateResearchResponse, 'title' | 'type'>;

export type CreateResearchResponse = Promise<CreateResearch>;
