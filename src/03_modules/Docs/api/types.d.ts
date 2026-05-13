interface DocData {
  id: string;
  slug: string;
  title: string;
  description?: string;
  content: string;
  order: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type DocAll = Pick<DocData, 'slug' | 'title' | 'order' | 'updatedAt'>[];
export type DocAllResponse = Promise<DocAll>;

export type DocUnique = Pick<DocData, 'slug' | 'title' | 'description' | 'content' | 'published' | 'updatedAt'>;
export type DocUniqueResponse = Promise<DocUnique>;
