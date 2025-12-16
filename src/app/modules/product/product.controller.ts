import { Request, Response } from "express";
import * as service from "./product.service";
import catchAsync from "../../utils/catchAsync";

export const createProductHandler = catchAsync(async (req, res) => {
  const product = await service.createProduct(req.body);
  res.status(201).json({ success: true, data: product });
});

export const getProductsHandler = catchAsync(async (req, res) => {
  const { docs, total } = await service.getProducts({}, 50, 0);
  res.json({ success: true, total, data: docs });
});

export const getProductHandler = catchAsync(async (req, res) => {
  const product = await service.getProductById(req.params.id);
  if (!product)
    return res.status(404).json({ success: false, message: "Not found" });
  res.json({ success: true, data: product });
});
