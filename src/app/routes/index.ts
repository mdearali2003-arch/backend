import { Router } from "express";
import { ProductRoutes } from "../modules/product/product.route";
import { NewsletterRoutes } from "../modules/newsletter/newsletter.route";
import { VideoRouter } from "../modules/video/video.route";
import { ArticleRoutes } from "../modules/articles/article.route";
import { UserRouter } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { UploadRoutes } from "../modules/upload/upload.route";
import { ImageGalleryRoutes } from "../modules/imageGallery/imageGallery.route";

const router = Router();
const moduleRoutes = [
  {
    path: "/products",
    route: ProductRoutes,
  },
  {
    path: "/newsletter",
    route: NewsletterRoutes,
  },
  {
    path: "/videos",
    route: VideoRouter,
  },
  {
    path: "/articles",
    route: ArticleRoutes,
  },
  {
    path: "/user",
    route: UserRouter,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/upload",
    route: UploadRoutes,
  },
  {
    path: "/image-gallery",
    route: ImageGalleryRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
