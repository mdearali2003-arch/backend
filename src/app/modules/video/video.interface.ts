export type VideoCategory =
  | "personal development"
  | "business & entrepreneurship"
  | "financial literacy"
  | "podcast";

export interface IVideo {
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  category: VideoCategory;
}
