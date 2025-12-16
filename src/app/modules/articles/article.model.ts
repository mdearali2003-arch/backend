// src/app/modules/article/article.model.ts
import { Schema, model } from "mongoose";
import { IArticle } from "./article.interface";

// export interface IArticle {
//   title: string;
//   content: string;
//   image?: string;
//   status: "draft" | "published";
//   createdAt: Date;
//   updatedAt: Date;
// }

const articleSchema = new Schema<IArticle>(
  {
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
  },
  { timestamps: true }
);

export const Article = model<IArticle>("Article", articleSchema);
