import { Router } from "express";
import { ImageGalleryController } from "./imageGallery.controller";

const router = Router();

router.post("/", ImageGalleryController.uploadImage);
router.get("/", ImageGalleryController.getImages);
router.delete("/:id", ImageGalleryController.deleteImage);

export const ImageGalleryRoutes = router;
