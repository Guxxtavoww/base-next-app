'use client';

import { useLayoutEffect, useState } from 'react';

import { useMediaQuery } from './use-media-query.hook';

/**
 * Represents the state of responsive breakpoints for different screen sizes.
 *
 * @interface Breakpoints
 */
interface Breakpoints {
  /** Indicates if the screen width is in the `xs` breakpoint range (max-width: 640px). */
  isXs: boolean;

  /** Indicates if the screen width is in the `sm` breakpoint range (min-width: 641px and max-width: 768px). */
  isSm: boolean;

  /** Indicates if the screen width is in the `md` breakpoint range (min-width: 769px and max-width: 1024px). */
  isMd: boolean;

  /** Indicates if the screen width is in the `lg` breakpoint range (min-width: 1025px). */
  isLg: boolean;

  /** The active breakpoint as a string. Can be 'SSR', 'xs', 'sm', 'md', or 'lg'. */
  active: 'SSR' | 'xs' | 'sm' | 'md' | 'lg';
}

/**
 * Custom hook that determines the current responsive breakpoint based on screen width.
 *
 * This hook uses media queries to detect the screen size and returns an object containing
 * boolean values for each breakpoint (`xs`, `sm`, `md`, `lg`). It also provides the active
 * breakpoint as a string value.
 *
 * @returns {Breakpoints} - An object with boolean flags for each breakpoint and the active breakpoint.
 */
export function useBreakpoints(): Breakpoints {
  const [isClient, setIsClient] = useState<boolean>(false);

  const breakpoints: Breakpoints = {
    isXs: useMediaQuery('(max-width: 640px)'),
    isSm: useMediaQuery('(min-width: 641px) and (max-width: 768px)'),
    isMd: useMediaQuery('(min-width: 769px) and (max-width: 1024px)'),
    isLg: useMediaQuery('(min-width: 1025px)'),
    active: 'SSR',
  };

  useLayoutEffect(() => {
    setIsClient(typeof window !== 'undefined');
  }, []);

  if (isClient && breakpoints.isXs) breakpoints.active = 'xs';
  if (isClient && breakpoints.isSm) breakpoints.active = 'sm';
  if (isClient && breakpoints.isMd) breakpoints.active = 'md';
  if (isClient && breakpoints.isLg) breakpoints.active = 'lg';

  return breakpoints;
}
