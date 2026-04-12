export interface HebbianSamples {
  x: number[];
  y_true: number;
}

export interface HebbianData {
  id: number;
  data: HebbianSamples[];
  epoch: number;
  error: number;
  i: number;
  j: number;
  isTrained: boolean;
  neuron: number;
  s: number;
  w: number[];
  y_pred: number;
}

export type HebbianDataResponse = Promise<HebbianData>;

export interface RecognitionBody {
  id: string;
  x: number;
}

export interface RecognitionData {
  result: number;
}

export type RecognitionResponse = Promise<RecognitionData>;

export interface ChangeWeightBody {
  id: string;
}

export type ChangeWeightData = { y_true: number } & Omit<HebbianData, 'data'>;

export type ChangeWeightResponse = Promise<ChangeWeightData>;

export interface GenerateDataBody {
  id: string;
  data: HebbianData[];
}

export interface GenerateData {
  algorithmDeltaId?: number;
  algorithmId?: number;
  createdAt: Date;
  id: string;
  title: string;
  type: number;
  updatedAt: Date;
}

export type GenerateDataResponse = Promise<GenerateData>;
