import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validateRequest = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err: any) {
      return res.status(400).json({
        success: false,
        message: err.errors ? err.errors[0].message : "Validation error",
      });
    }
  };
};
