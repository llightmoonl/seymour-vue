export interface DistributionItem {
  rule: 'HEBBIAN' | 'DELTA' | 'BACKPROPAGATION';
  count: number;
}

export interface DashboardSummary {
  totalProjects: number;
  trained: number;
  inProgress: number;
  distribution: DistributionItem[];
}

export interface ActivityItem {
  id: string;
  projectTitle: string;
  type: string;
  createdAt: string;
}

export interface ActivityResponse {
  items: ActivityItem[];
  total: number;
  page: number;
  limit: number;
}
