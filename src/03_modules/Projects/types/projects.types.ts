export interface ProjectType {
  key: string;
  name: string;
}

export interface ProjectsListItem {
  id: string;
  title: string;
  typeName: string;
  url: string;
  updatedAt: string;
}
