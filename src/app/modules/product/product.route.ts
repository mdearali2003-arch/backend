import { Router } from "express";
import * as controller from "./product.controller";

const router = Router();

router.post("/", controller.createProductHandler);
router.get("/", controller.getProductsHandler);
router.get("/:id", controller.getProductHandler);

export const ProductRoutes = router;
