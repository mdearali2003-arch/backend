"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageGalleryController = void 0;
const imageGallery_service_1 = require("./imageGallery.service");
exports.ImageGalleryController = {
    async uploadImage(req, res) {
        try {
            const { url } = req.body;
            console.log("url :>> ", url);
            if (!url) {
                return res
                    .status(400)
                    .json({ success: false, message: "Image URL is required" });
            }
            const newImage = await imageGallery_service_1.ImageGalleryService.addImage({ url });
            return res.status(201).json({
                success: true,
                message: "Image URL saved successfully",
                data: newImage,
            });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "Failed to save image URL",
                error: error.message,
            });
        }
    },
    async getImages(req, res) {
        try {
            const images = await imageGallery_service_1.ImageGalleryService.getAllImages();
            return res.status(200).json({ success: true, data: images });
        }
        catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    },
    async deleteImage(req, res) {
        try {
            const { id } = req.params;
            const deleted = await imageGallery_service_1.ImageGalleryService.deleteImageById(id);
            if (!deleted) {
                return res
                    .status(404)
                    .json({ success: false, message: "Image not found" });
            }
            return res
                .status(200)
                .json({ success: true, message: "Image deleted successfully" });
        }
        catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    },
};
