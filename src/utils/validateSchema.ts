import type { ZodType } from "zod";

export const validateSchema = <T>(schema: ZodType<T>, data: T) => {
  const result = schema.safeParse(data);

  if (!result.success) {
    const errors: Record<string, string> = {};

    result.error.issues.forEach((issue) => {
      errors[issue.path.join(".")] = issue.message;
    });

    return {
      success: false,
      errors,
    };
  }

  return {
    success: true,
    errors: {},
  };
};
