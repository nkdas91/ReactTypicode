import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines and merges CSS class names.
 *
 * Uses:
 * - clsx to conditionally build class strings
 * - tailwind-merge to resolve conflicting Tailwind classes
 *
 * Example:
 * ```ts
 * classNames(
 *   "px-2 py-1",
 *   isActive && "bg-blue-500",
 *   "px-4",
 * );
 * // => "py-1 bg-blue-500 px-4"
 * ```
 *
 * @param {...Parameters<typeof clsx>} inputs - Class values supported by clsx
 * @returns {string} Merged class name string
 */
export function classNames(...inputs: Parameters<typeof clsx>): string {
  /**
   * Build the class string and resolve Tailwind conflicts.
   */
  return twMerge(clsx(inputs));
}
