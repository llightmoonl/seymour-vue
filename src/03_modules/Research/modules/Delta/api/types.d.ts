export interface DeltaSamples {
  x: number[];
  y_true: number[];
}

export interface DeltaData {
  id: number;
  data: DeltaSamples[];
  epoch: number;
  error: number;
  epsilon: number[];
  eta: number;
  i: number;
  j: number;
  k: number;
  isTrained: boolean;
  s: number[];
  w: number[][];
  y_pred: number[];
}

export type DeltaDataResponse = Promise<DeltaData>;

export interface RecognitionBody {
  id: string;
  x: number;
}

export interface RecognitionData {
  s: number[];
  y_pred: number[];
}

export type RecognitionResponse = Promise<RecognitionData>;

export interface ChangeWeightBody {
  id: string;
}

export type ChangeWeightData = Omit<DeltaData, 'data' | 'id'>;

export type ChangeWeightResponse = Promise<ChangeWeightData>;

export interface GenerateData {
  algorithmDeltaId?: number;
  algorithmId?: number;
  createdAt: Date;
  id: string;
  title: string;
  type: number;
  updatedAt: Date;
}

export interface GenerateDataBody {
  id: string;
  data: GenerateDataItem[];
}

export interface GenerateDataItem {
  y_true: number[];
  x: number[];
}

export type GenerateDataResponse = Promise<GenerateData>;
