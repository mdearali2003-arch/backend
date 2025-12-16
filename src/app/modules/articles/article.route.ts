import { Router } from "express";
import * as controller from "./article.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createDraftSchema, publishArticleSchema } from "./article.validation";
import multer from "multer";
import path from "path";
const router = Router();

// Multer config
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../../uploads"),
  filename: (_req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Draft
router.post("/draft", validateRequest(createDraftSchema), controller.saveDraft);

// Publish
router.post(
  "/publish",
  validateRequest(publishArticleSchema),
  controller.publishArticle
);
// Upload image
router.post(
  "/upload/:id",
  upload.single("image"),
  controller.uploadArticleImage
);

// Get all
router.get("/", controller.getAllArticles);
router.get("/published", controller.getAllPublishedArticles);

// Get by ID
router.get("/:id", controller.getArticleById);

// Delete
router.delete("/:id", controller.deleteArticle);
router.patch("/:id/publish", controller.UpdateStatusArticle);
router.patch("/:id", controller.updateArticle);

export const ArticleRoutes = router;
