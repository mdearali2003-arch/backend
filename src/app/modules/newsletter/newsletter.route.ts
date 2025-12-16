import { Router } from "express";
import * as controller from "./newsletter.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import {
  createNewsletterSchema,
  updateNewsletterSchema,
} from "./newsletter.validation";

const router = Router();

// Create with validation
router.post(
  "/",
  validateRequest(createNewsletterSchema),
  controller.createNewsletter
);

// Get all
router.get("/", controller.getAllNewsletters);

// Get by ID
router.get("/:id", controller.getNewsletterById);

// Update with validation
router.patch(
  "/:id",
  validateRequest(updateNewsletterSchema),
  controller.updateNewsletter
);

// Delete
router.delete("/:id", controller.deleteNewsletter);
router.post("/send-all", controller.sendToAll);

export const NewsletterRoutes = router;
