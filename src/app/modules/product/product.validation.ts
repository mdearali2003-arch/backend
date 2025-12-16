import { z } from "zod";

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    price: z.number(),
    description: z.string().optional(),
    discountPrice: z.number().optional(),
    categories: z.array(z.string()).optional(),
  }),
});
