'use client';

import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface CustomTooltipProps extends WithChildren {
  tooltipText: string;
  delay?: number;
}

export function CustomTooltip({
  children,
  tooltipText,
  delay,
}: CustomTooltipProps): JSX.Element {
  return (
    <Tooltip delayDuration={delay ?? 250}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>{tooltipText}</TooltipContent>
    </Tooltip>
  );
}
