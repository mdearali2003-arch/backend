import { Router } from "express";
// check relative path

import upload from "../../middlewares/upload.middleware";
import { uploadImage } from "./upload.controller";

const router = Router();

router.post(
  "/",
  upload.single("image"),
  (req, res, next) => {
    console.log("Middleware passed, req.file:", req.file);
    next(); // আগের controller call হবে
  },
  uploadImage
);

export const UploadRoutes = router;
