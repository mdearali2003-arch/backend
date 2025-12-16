"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishArticleSchema = exports.createDraftSchema = void 0;
const zod_1 = require("zod");
exports.createDraftSchema = zod_1.z.object({
    title: zod_1.z.string().min(3, "Title must be at least 3 characters"),
    content: zod_1.z.string().min(10, "Content must be at least 10 characters"),
});
exports.publishArticleSchema = zod_1.z.object({
    title: zod_1.z.string().min(3, "Title must be at least 3 characters"),
    content: zod_1.z
        .string()
        .min(50, "Content must be at least 50 characters to publish"),
});
