"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVideoSchema = exports.createVideoSchema = void 0;
const zod_1 = require("zod");
const categories = [
    "personal development",
    "business & entrepreneurship",
    "financial literacy",
    "podcast",
];
exports.createVideoSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required"),
    description: zod_1.z.string().min(1, "Description is required"),
    thumbnail: zod_1.z.url({ message: "Thumbnail must be a valid URL" }),
    videoUrl: zod_1.z.url({ message: "Video URL must be a valid URL" }),
    category: zod_1.z.enum(categories, { message: "Invalid category" }),
});
exports.updateVideoSchema = zod_1.z.object({
    title: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    thumbnail: zod_1.z.string().url("Thumbnail must be a valid URL").optional(),
    videoUrl: zod_1.z.string().url("Video URL must be a valid URL").optional(),
    category: zod_1.z.enum(categories).optional(),
});
