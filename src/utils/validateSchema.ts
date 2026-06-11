import type { ZodType } from "zod";

/**
 * Validates data against a Zod schema and returns a simplified result.
 *
 * Converts Zod validation issues into a flat object keyed by field path,
 * making it easier to display validation errors in forms.
 *
 * Example:
 * {
 *   success: false,
 *   errors: {
 *     name: "Name is required",
 *     "address.city": "City is required",
 *   },
 * }
 *
 * @template T
 * @param {ZodType<T>} schema - Zod schema used for validation
 * @param {T} data - Data to validate
 * @returns {{
 *   success: boolean;
 *   errors: Record<string, string>;
 * }} Validation result containing success state and field errors
 */
export const validateSchema = <T>(schema: ZodType<T>, data: T) => {
  /**
   * Execute schema validation.
   */
  const result = schema.safeParse(data);

  /**
   * Convert Zod issues into a field-to-message map.
   */
  if (!result.success) {
    const errors: Record<string, string> = {};

    /**
     * Build error object using dot notation paths.
     *
     * Example:
     * address.city -> "City is required"
     */
    result.error.issues.forEach((issue) => {
      errors[issue.path.join(".")] = issue.message;
    });

    return {
      success: false,
      errors,
    };
  }

  /**
   * Validation passed with no errors.
   */
  return {
    success: true,
    errors: {},
  };
};
