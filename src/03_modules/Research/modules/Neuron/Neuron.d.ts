export interface NeuronBaseProps {
  x?: number[];
  w?: number[];
  s?: number;
  y?: number;
  neuron?: number;
}

export interface NeuronDeltaProps {
  x?: number[];
  w?: number[];
  s?: number[];
  y?: number[];
}
