export interface ProjectsListItem {
  id: string;
  title: string;
  type: number;
  url: string;
  datetime: string;
}

export interface ProjectsListProps {
  items: ProjectsListItem[];
}
