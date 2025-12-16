"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Article = void 0;
// src/app/modules/article/article.model.ts
const mongoose_1 = require("mongoose");
// export interface IArticle {
//   title: string;
//   content: string;
//   image?: string;
//   status: "draft" | "published";
//   createdAt: Date;
//   updatedAt: Date;
// }
const articleSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
    },
    image: { type: String },
    status: {
        type: String,
        enum: ["draft", "published"],
        default: "draft",
    },
}, { timestamps: true });
exports.Article = (0, mongoose_1.model)("Article", articleSchema);
