import { Video } from "./video.model";
import { IVideo } from "./video.interface";

const createVideo = async (payload: IVideo) => {
  const result = await Video.create(payload);
  return result;
};

const getAllVideos = async () => {
  const result = await Video.find();
  return result;
};

const getVideoById = async (id: string) => {
  const result = await Video.findById(id);
  return result;
};

const updateVideo = async (id: string, payload: Partial<IVideo>) => {
  const result = await Video.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteVideo = async (id: string) => {
  const result = await Video.findByIdAndDelete(id);
  return result;
};

const getVideosByCategory = async (category: string) => {
  const validCategories = [
    "personal development",
    "business & entrepreneurship",
    "financial literacy",
    "podcast",
  ];

  if (!validCategories.includes(category)) {
    throw new Error("Invalid category");
  }

  const result = await Video.find({ category });
  return result;
};

export const VideoService = {
  createVideo,
  getAllVideos,
  getVideoById,
  updateVideo,
  deleteVideo,
  getVideosByCategory,
};
