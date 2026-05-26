import { z } from "zod";
import { VALIDATION } from "../constants/validation";

const postValidation = VALIDATION.POST;

export const postSchema = z.object({
  title: z
    .string()
    .trim()
    .min(
      postValidation.TITLE.MIN,
      `Title must be at least ${postValidation.TITLE.MIN} characters`,
    )
    .max(
      postValidation.TITLE.MAX,
      `Title cannot exceed ${postValidation.TITLE.MAX} characters`,
    ),

  body: z
    .string()
    .trim()
    .min(
      postValidation.BODY.MIN,
      `Body must be at least ${postValidation.BODY.MIN} characters`,
    )
    .max(
      postValidation.BODY.MAX,
      `Body cannot exceed ${postValidation.BODY.MAX} characters`,
    ),
});
