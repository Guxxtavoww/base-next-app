import { useState, useEffect } from 'react';

/**
 * Custom hook that debounces a value. It delays the update of the value until after a specified time period has passed.
 *
 * @template T - The type of the value to be debounced.
 * @param {T} value - The value that needs to be debounced.
 * @param {number} [delay=500] - The delay in milliseconds for the debounce. Defaults to 500ms if not provided.
 * @returns {T} - The debounced value.
 */
export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay ?? 500);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
