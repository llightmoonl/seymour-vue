export interface ProjectsListItem {
  id: string;
  title: string;
  type: string;
  url: string;
  datetime: string;
}

export interface ProjectsListProps {
  items: ProjectsListItem[];
}
