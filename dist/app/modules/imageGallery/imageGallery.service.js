"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageGalleryService = void 0;
const imageGallery_model_1 = require("./imageGallery.model");
exports.ImageGalleryService = {
    async addImage(data) {
        const newImage = await imageGallery_model_1.ImageGallery.create(data);
        return newImage;
    },
    async getAllImages() {
        return imageGallery_model_1.ImageGallery.find().sort({ createdAt: -1 });
    },
    async deleteImageById(id) {
        return imageGallery_model_1.ImageGallery.findByIdAndDelete(id);
    },
};
