import { useEffect, useState } from "react";

/**
 * Custom hook that syncs state with browser localStorage.
 *
 * On initialization, it reads the stored value from localStorage.
 * If no value exists or parsing fails, it falls back to the provided initial value.
 *
 * Any updates to the state are automatically persisted to localStorage.
 *
 * @template T - Type of the stored value
 * @param {string} key - localStorage key used to store the value
 * @param {T} initialValue - Default value if nothing exists in storage
 * @returns {[T, React.Dispatch<React.SetStateAction<T>>]} A stateful value and setter function
 */
export default function useLocalStorage<T>(key: string, initialValue: T) {
  /**
   * State synchronized with localStorage.
   */
  const [value, setValue] = useState<T>(() => {
    const saved = localStorage.getItem(key);

    if (!saved) {
      return initialValue;
    }

    try {
      return JSON.parse(saved);
    } catch {
      return initialValue;
    }
  });

  /**
   * Persist value changes to localStorage.
   */
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
