import { Router } from "express";
import * as controller from "./video.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createVideoSchema, updateVideoSchema } from "./video.validation";

const router = Router();

router.post("/", validateRequest(createVideoSchema), controller.createVideo);
router.get("/", controller.getAllVideos);
router.get("/:id", controller.getVideoById);
router.patch(
  "/:id",
  validateRequest(updateVideoSchema),
  controller.updateVideo
);
router.delete("/:id", controller.deleteVideo);
router.get("/category/:category", controller.getVideosByCategory);

export const VideoRouter = router;
