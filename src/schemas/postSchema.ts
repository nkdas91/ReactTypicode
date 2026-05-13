import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(1, "Title is required"),

  body: z.string().min(1, "Body is required"),
});
