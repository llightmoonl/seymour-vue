export function clone2DArray<T>(array: T[][]): T[][] {
  return array.map((row: T[]): T[] => [...row]);
}

export const formatArray = (arr?: number[]) => (arr ?? []).map((v) => Number(v.toFixed(2)));
