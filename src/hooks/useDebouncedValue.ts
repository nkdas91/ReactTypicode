import { useEffect, useState } from "react";
import { DEFAULT_DEBOUNCE_DELAY } from "../constants/api";

/**
 * Returns a debounced version of the input value.
 *
 * The value is updated only after the specified delay
 * has passed.
 */
export default function useDebouncedValue<T>(
  value: T,
  delay: number = DEFAULT_DEBOUNCE_DELAY,
) {
  // Stores the debounced (delayed) value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Start a timer whenever value changes
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clear previous timer if value changes
    // before delay completes
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
}
