export interface ResearchListItem {
  id: string;
  title: string;
  type: string;
  url: string;
  datetime: string;
}

export interface ResearchListProps {
  items: ResearchListItem[];
}
