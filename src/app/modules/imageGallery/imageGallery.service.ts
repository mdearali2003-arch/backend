import { ImageGallery } from "./imageGallery.model";

export const ImageGalleryService = {
  async addImage(data: { url: string }) {
    const newImage = await ImageGallery.create(data);
    return newImage;
  },

  async getAllImages() {
    return ImageGallery.find().sort({ createdAt: -1 });
  },

  async deleteImageById(id: string) {
    return ImageGallery.findByIdAndDelete(id);
  },
};
