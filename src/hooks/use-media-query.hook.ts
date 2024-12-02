'use client';

import { useState, useEffect } from 'react';

export interface MediaQueryProps {
  maxWidth?: number;
  minWidth?: number;
  maxHeight?: number;
  minHeight?: number;
  readonly orientation?: 'portrait' | 'landscape';
}

/**
 * Custom hook to evaluate a dynamically constructed CSS media query.
 *
 * @param {MediaQueryProps} props - Configuration object for building the media query.
 * @returns {boolean} - Returns `true` if the media query matches, otherwise `false`.
 */
export function useMediaQuery({
  maxHeight,
  maxWidth,
  minHeight,
  minWidth,
  orientation = 'landscape',
}: MediaQueryProps): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const parts: string[] = [];

    parts.push(`(orientation: ${orientation})`);

    if (minWidth) parts.push(`(min-width: ${minWidth}px)`);
    if (maxWidth) parts.push(`(max-width: ${maxWidth}px)`);
    if (minHeight) parts.push(`(min-height: ${minHeight}px)`);
    if (maxHeight) parts.push(`(max-height: ${maxHeight}px)`);

    const query = parts.join(' and ');

    if (!query) return console.error('---------Invalid query------');

    const media = window.matchMedia(query);
    const updateMatches = () => setMatches(media.matches);

    updateMatches();
    media.addEventListener('change', updateMatches);

    return () => media.removeEventListener('change', updateMatches);
  }, [maxHeight, maxWidth, minHeight, minWidth, orientation]);

  return matches;
}
