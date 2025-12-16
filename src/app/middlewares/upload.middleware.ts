import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "EarAli-images",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 1500, crop: "limit" }],
  } as any,
});

const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

export default upload;
