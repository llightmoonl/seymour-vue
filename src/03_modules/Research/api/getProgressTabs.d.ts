export interface ProgressTabsItem {
  key: string;
  completed: boolean;
}

export type ProgressTabsResponse = Promise<ProgressTabsItem[]>;
