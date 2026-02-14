export function clone2DArray<T>(array: T[][] ): T[][] {
  return array.map((row: T[]): T[] => [...row]);
}
