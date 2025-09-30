import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Debounce any value by a given delay.
 * Provides `cancel` and `flush` methods.
 * @param value Value to debounce
 * @param delay Delay in milliseconds (default 500ms)
 * @returns [debouncedValue, controls]
 */
export function useDebounce<T>(value: T, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancel = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const flush = useCallback(() => {
    cancel();
    setDebouncedValue(value);
  }, [value, cancel]);

  useEffect(() => {
    cancel();

    timerRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return cancel;
  }, [value, delay, cancel]);

  return [debouncedValue, { cancel, flush }] as const;
}
