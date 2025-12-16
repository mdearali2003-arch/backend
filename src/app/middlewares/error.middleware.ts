import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/ApiError";

export default (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  if (err instanceof ApiError) {
    return res
      .status(err.statusCode)
      .json({ success: false, message: err.message });
  }

  // mongoose validation error handling (simplified)
  if (err.name === "ValidationError") {
    return res.status(400).json({ success: false, message: err.message });
  }

  res
    .status(err.status || 500)
    .json({ success: false, message: err.message || "Internal Server Error" });
};
