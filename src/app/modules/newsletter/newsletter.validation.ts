import z from "zod";

export const createNewsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const updateNewsletterSchema = z.object({
  email: z.string().email("Invalid email address").optional(),
});
