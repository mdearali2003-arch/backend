import { ProductModel } from "./product.model";
import { IProduct } from "./product.interface";

export const createProduct = async (payload: IProduct) => {
  return ProductModel.create(payload);
};

export const getProducts = async (filter = {}, limit = 20, skip = 0) => {
  const docs = await ProductModel.find(filter).limit(limit).skip(skip).lean();
  const total = await ProductModel.countDocuments(filter);
  return { docs, total };
};

export const getProductById = async (id: string) => {
  return ProductModel.findById(id);
};

export const updateProduct = async (id: string, payload: Partial<IProduct>) => {
  return ProductModel.findByIdAndUpdate(id, payload, { new: true });
};

export const deleteProduct = async (id: string) => {
  return ProductModel.findByIdAndDelete(id);
};
