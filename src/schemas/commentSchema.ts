import { z } from "zod";

export const commentSchema = z.object({
  name: z.string().min(1, "Title is required"),
  email: z.email("Invalid email"),
  body: z.string().min(1, "Body is required"),
});
