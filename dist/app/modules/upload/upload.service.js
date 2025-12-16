"use strict";
// src/services/upload.service.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUploadedFileUrl = void 0;
const getUploadedFileUrl = (file) => {
    if (!file)
        throw new Error("No file provided");
    // multer-storage-cloudinary typically returns `path`
    // but some variants provide `secure_url` or `location`
    // we try multiple fallbacks
    const maybePath = file.path || file.secure_url || file.location;
    if (!maybePath)
        throw new Error("Uploaded file URL not found");
    return maybePath;
};
exports.getUploadedFileUrl = getUploadedFileUrl;
