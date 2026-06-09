export interface HebbianSamples {
  x: number[];
  y_true: number;
}

export type Stage = 'generation' | 'training' | 'quality' | 'recognition';

export interface HebbianData {
  id: number;
  data: HebbianSamples[];
  epoch: number;
  error: number;
  i: number;
  j: number;
  isTrained: boolean;
  correction: string;
  neuron: number;
  s: number;
  w: number[];
  y_pred: number;
  activeStage: Stage;
}

export interface RecognitionBody {
  id: string;
  x: number;
}

export interface RecognitionData {
  result: number;
}

export interface ChangeWeightBody {
  id: string;
}

export type ChangeWeightData = { y_true: number } & Omit<HebbianData, 'data'>;

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

export interface NextStageBody {
  id: string;
}

export interface NextStageData {
  success: boolean;
}
