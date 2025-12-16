"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleService = void 0;
const article_model_1 = require("./article.model");
const saveDraft = async (payload) => {
    const result = await article_model_1.Article.create({
        ...payload,
        status: "draft",
    });
    return result;
};
const publishArticle = async (payload) => {
    const result = await article_model_1.Article.create({
        ...payload,
        status: "published",
    });
    return result;
};
const getAllArticles = async () => {
    const result = await article_model_1.Article.find().sort({ createdAt: -1 });
    return result;
};
const getAllPublishedArticles = async () => {
    const result = await article_model_1.Article.find({ status: "published" }).sort({
        createdAt: -1,
    });
    return result;
};
const getArticleById = async (id) => {
    const result = await article_model_1.Article.findById(id);
    return result;
};
const updateArticle = async (id, payload) => {
    const result = await article_model_1.Article.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
};
const deleteArticle = async (id) => {
    const result = await article_model_1.Article.findByIdAndDelete(id);
    return result;
};
const UpdateStatusArticle = async (id) => {
    const result = await article_model_1.Article.findByIdAndUpdate(id, { status: "published" }, { new: true, runValidators: true });
    return result;
};
exports.ArticleService = {
    saveDraft,
    publishArticle,
    getAllArticles,
    getAllPublishedArticles,
    getArticleById,
    updateArticle,
    deleteArticle,
    UpdateStatusArticle,
};
