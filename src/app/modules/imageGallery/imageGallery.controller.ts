import { Request, Response } from "express";
import { ImageGalleryService } from "./imageGallery.service";

export const ImageGalleryController = {
  async uploadImage(req: Request, res: Response) {
    try {
      const { url } = req.body;
      console.log("url :>> ", url);

      if (!url) {
        return res
          .status(400)
          .json({ success: false, message: "Image URL is required" });
      }

      const newImage = await ImageGalleryService.addImage({ url });

      return res.status(201).json({
        success: true,
        message: "Image URL saved successfully",
        data: newImage,
      });
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Failed to save image URL",
        error: error.message,
      });
    }
  },

  async getImages(req: Request, res: Response) {
    try {
      const images = await ImageGalleryService.getAllImages();
      return res.status(200).json({ success: true, data: images });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  async deleteImage(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deleted = await ImageGalleryService.deleteImageById(id);

      if (!deleted) {
        return res
          .status(404)
          .json({ success: false, message: "Image not found" });
      }

      return res
        .status(200)
        .json({ success: true, message: "Image deleted successfully" });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },
};
