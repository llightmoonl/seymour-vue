export interface RecentProjectsListProps {
  items: RecentProjectsListItem[];
}

export interface RecentProjectsListItem {
  id: string;
  title: string;
  typeName: string;
  url: string;
  updatedAt: string;
}
