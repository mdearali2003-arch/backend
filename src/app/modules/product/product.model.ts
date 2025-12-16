import { Schema, model, Document } from "mongoose";
import { IProduct } from "./product.interface";

export interface ProductDocument extends IProduct, Document {}

const productSchema = new Schema<ProductDocument>(
  {
    name: { type: String, required: true },
    slug: { type: String },
    description: { type: String },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    categories: [{ type: String }],
  },
  { timestamps: true }
);

export const ProductModel = model<ProductDocument>("Product", productSchema);
