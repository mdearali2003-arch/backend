import { Schema, model } from "mongoose";
import { IVideo, VideoCategory } from "./video.interface";

const videoSchema = new Schema<IVideo>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "personal development",
        "business & entrepreneurship",
        "financial literacy",
        "podcast",
      ] as VideoCategory[],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Video = model<IVideo>("Video", videoSchema);
