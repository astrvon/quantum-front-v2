import { useState, useEffect } from "react";

/**
 * Debounce a value by delaying its update until after delay ms
 * @param value The value to debounce
 * @param delay Delay in milliseconds (default 300ms)
 * @returns The debounced value
 */
export function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);

    // Cleanup on value or delay change or unmount
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
