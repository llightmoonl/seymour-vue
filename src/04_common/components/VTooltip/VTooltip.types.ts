export const TooltipSides = {
  TOP: 'top',
  RIGHT: 'right',
  BOTTOM: 'bottom',
  LEFT: 'left',
} as const;

type TooltipSide = (typeof TooltipSides)[keyof typeof TooltipSides];

export interface TooltipProps {
  side: TooltipSide;
  sideOffset?: number;
}
