import { ALL_THEMES } from './constants';
import type { Theme } from '../themes';

export function isTheme(value: string | null): value is Theme {
  return value !== null && ALL_THEMES.includes(value as Theme);
}
