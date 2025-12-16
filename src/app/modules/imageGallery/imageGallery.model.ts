import { Schema, model, Document } from "mongoose";

export interface ImageGallery extends Document {
  url: string;
  createdAt: Date;
  updatedAt: Date;
}

const imageGallerySchema = new Schema<ImageGallery>(
  {
    url: { type: String, required: true },
  },
  { timestamps: true }
);

export const ImageGallery = model<ImageGallery>(
  "ImageGallery",
  imageGallerySchema
);
