import { Request, Response } from "express";

export const uploadImage = async (req: Request, res: Response) => {
  try {
    console.log("File received:", req.file);
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    // multer-storage-cloudinary gives URL in req.file.path
    const file = req.file as Express.Multer.File & { path: string };
    const imageUrl = file.path;

    return res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      url: imageUrl,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Upload failed" });
  }
};
