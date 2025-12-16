import { z } from "zod";

export const createDraftSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
});

export const publishArticleSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  content: z
    .string()
    .min(50, "Content must be at least 50 characters to publish"),
});
