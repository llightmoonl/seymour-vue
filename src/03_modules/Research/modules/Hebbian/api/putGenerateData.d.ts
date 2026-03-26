export interface GenerateDataBody {
  id: string;
  data: GenerateDataItem[];
}

export interface GenerateDataItem {
  y_true: number;
  x: number[];
}
