export interface ResearchListItem {
  id: number;
  title: string;
  type: string;
  url: string;
  datetime: string;
}

export interface DetailListProps {
  details: DetailListItem[];
}
