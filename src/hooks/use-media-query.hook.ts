'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook to evaluate a CSS media query and determine if it matches.
 *
 * @param {string} query - The media query string to evaluate.
 * @returns {boolean} - Returns `true` if the media query matches, otherwise `false`.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const updateMatches = () => setMatches(media.matches);

    updateMatches();
    media.addEventListener('change', updateMatches);

    return () => media.removeEventListener('change', updateMatches);
  }, [query]);

  return matches;
}
