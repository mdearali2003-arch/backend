import { z } from "zod";

const categories = [
  "personal development",
  "business & entrepreneurship",
  "financial literacy",
  "podcast",
] as const;

export const createVideoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  thumbnail: z.url({ message: "Thumbnail must be a valid URL" }),
  videoUrl: z.url({ message: "Video URL must be a valid URL" }),
  category: z.enum(categories, { message: "Invalid category" }),
});

export const updateVideoSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  thumbnail: z.string().url("Thumbnail must be a valid URL").optional(),
  videoUrl: z.string().url("Video URL must be a valid URL").optional(),
  category: z.enum(categories).optional(),
});
