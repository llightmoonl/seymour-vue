export interface ProjectsListItem {
  id: string;
  title: string;
  type: string;
  url: string;
  updatedAt: string;
}

export interface ProjectsListProps {
  items: ProjectsListItem[];
}

export interface ProjectType {
  key: string;
  name: string;
}
