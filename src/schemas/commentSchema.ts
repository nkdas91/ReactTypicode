import { z } from "zod";
import { VALIDATION } from "../constants/validation";

const commentValidation = VALIDATION.COMMENT;

export const commentSchema = z.object({
  name: z
    .string()
    .trim()
    .min(
      commentValidation.NAME.MIN,
      `Title must be at least ${commentValidation.NAME.MIN} characters`,
    )
    .max(
      commentValidation.NAME.MAX,
      `Title cannot exceed ${commentValidation.NAME.MAX} characters`,
    ),

  email: z.email("Invalid email address"),

  body: z
    .string()
    .trim()
    .min(
      commentValidation.BODY.MIN,
      `Comment must be at least ${commentValidation.BODY.MIN} characters`,
    )
    .max(
      commentValidation.BODY.MAX,
      `Comment cannot exceed ${commentValidation.BODY.MAX} characters`,
    ),
});
