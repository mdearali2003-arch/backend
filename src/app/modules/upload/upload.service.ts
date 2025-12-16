// src/services/upload.service.ts

export const getUploadedFileUrl = (file?: Express.MulterFile): string => {
  if (!file) throw new Error("No file provided");
  // multer-storage-cloudinary typically returns `path`
  // but some variants provide `secure_url` or `location`
  // we try multiple fallbacks
  const maybePath =
    (file as any).path || (file as any).secure_url || (file as any).location;
  if (!maybePath) throw new Error("Uploaded file URL not found");
  return maybePath;
};
