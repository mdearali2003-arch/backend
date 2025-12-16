import { Document } from "mongoose";

declare global {
  namespace Express {
    interface MulterFile extends multer.File {
      path?: string; // multer-storage-cloudinary adds `path`
      secure_url?: string;
      public_id?: string;
    }

    interface Request {
      user?: { id?: string; role?: string } | Document | any;
      file?: MulterFile;
    }
  }
}
