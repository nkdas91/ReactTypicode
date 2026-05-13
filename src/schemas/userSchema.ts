import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(1, "Name is required"),

  username: z.string().min(1, "Username is required"),

  email: z.email("Invalid email"),

  phone: z.string().min(10, "Invalid phone number"),

  website: z.string(),

  address: z.object({
    suite: z.string().min(1, "Suite is required"),

    street: z.string().min(1, "Street is required"),

    city: z.string().min(1, "City is required"),

    zipcode: z.string().min(1, "Zipcode is required"),
  }),
});
