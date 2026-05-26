import { z } from "zod";
import { VALIDATION } from "../constants/validation";

const USER = VALIDATION.USER;

export const userSchema = z.object({
  name: z
    .string()
    .trim()
    .min(USER.NAME.MIN, "Name is too short")
    .max(USER.NAME.MAX, "Name is too long"),

  username: z
    .string()
    .trim()
    .min(USER.USERNAME.MIN, "Username is too short")
    .max(USER.USERNAME.MAX, "Username is too long")
    .regex(
      USER.USERNAME.REGEX,
      "Username can only contain letters, numbers, and underscores",
    ),

  email: z.email("Invalid email address"),

  phone: z
    .string()
    .trim()
    .min(USER.PHONE.MIN, "Phone number is too short")
    .max(USER.PHONE.MAX, "Phone number is too long")
    .regex(USER.PHONE.REGEX, "Invalid phone number"),

  website: z
    .url("Invalid website URL")
    .max(USER.WEBSITE.MAX, "Website URL is too long")
    .or(z.literal("")),

  address: z.object({
    suite: z
      .string()
      .trim()
      .min(1, "Suite is required")
      .max(USER.ADDRESS.SUITE_MAX, "Suite is too long"),

    street: z
      .string()
      .trim()
      .min(1, "Street is required")
      .max(USER.ADDRESS.STREET_MAX, "Street is too long"),

    city: z
      .string()
      .trim()
      .min(1, "City is required")
      .max(USER.ADDRESS.CITY_MAX, "City is too long"),

    zipcode: z
      .string()
      .trim()
      .min(1, "Zipcode is required")
      .max(USER.ADDRESS.ZIPCODE_MAX, "Zipcode is too long")
      .regex(USER.ADDRESS.ZIPCODE_REGEX, "Invalid zipcode"),
  }),
});
