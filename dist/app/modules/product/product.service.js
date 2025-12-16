"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.getProducts = exports.createProduct = void 0;
const product_model_1 = require("./product.model");
const createProduct = async (payload) => {
    return product_model_1.ProductModel.create(payload);
};
exports.createProduct = createProduct;
const getProducts = async (filter = {}, limit = 20, skip = 0) => {
    const docs = await product_model_1.ProductModel.find(filter).limit(limit).skip(skip).lean();
    const total = await product_model_1.ProductModel.countDocuments(filter);
    return { docs, total };
};
exports.getProducts = getProducts;
const getProductById = async (id) => {
    return product_model_1.ProductModel.findById(id);
};
exports.getProductById = getProductById;
const updateProduct = async (id, payload) => {
    return product_model_1.ProductModel.findByIdAndUpdate(id, payload, { new: true });
};
exports.updateProduct = updateProduct;
const deleteProduct = async (id) => {
    return product_model_1.ProductModel.findByIdAndDelete(id);
};
exports.deleteProduct = deleteProduct;
