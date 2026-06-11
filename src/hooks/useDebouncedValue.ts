import { useEffect, useState } from "react";
import { DEFAULT_DEBOUNCE_DELAY } from "../constants/api";

/**
 * Custom React hook that returns a debounced version of a value.
 *
 * The value is only updated after the specified delay has passed
 * without the input value changing. This is useful for optimizing
 * expensive operations such as API calls, search filtering, or validation.
 *
 * @template T - Generic type of the value being debounced
 * @param {T} value - The input value that should be debounced
 * @param {number} [delay=DEFAULT_DEBOUNCE_DELAY] - Delay in milliseconds before updating the debounced value
 * @returns {T} The debounced value that updates only after the delay
 */
export default function useDebouncedValue<T>(
  value: T,
  delay: number = DEFAULT_DEBOUNCE_DELAY,
): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    /**
     * Cleanup function that clears the previous timer
     * if the value or delay changes before completion.
     */
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
}
