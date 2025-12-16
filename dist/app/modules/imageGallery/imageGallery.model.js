"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageGallery = void 0;
const mongoose_1 = require("mongoose");
const imageGallerySchema = new mongoose_1.Schema({
    url: { type: String, required: true },
}, { timestamps: true });
exports.ImageGallery = (0, mongoose_1.model)("ImageGallery", imageGallerySchema);
