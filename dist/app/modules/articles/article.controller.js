"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateArticle = exports.UpdateStatusArticle = exports.deleteArticle = exports.getArticleById = exports.getAllPublishedArticles = exports.getAllArticles = exports.publishArticle = exports.saveDraft = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const article_service_1 = require("./article.service");
exports.saveDraft = (0, catchAsync_1.default)(async (req, res) => {
    const result = await article_service_1.ArticleService.saveDraft(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Draft saved successfully",
        data: result,
    });
});
exports.publishArticle = (0, catchAsync_1.default)(async (req, res) => {
    const result = await article_service_1.ArticleService.publishArticle(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Article published successfully",
        data: result,
    });
});
exports.getAllArticles = (0, catchAsync_1.default)(async (_req, res) => {
    const result = await article_service_1.ArticleService.getAllArticles();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Articles retrieved successfully",
        data: result,
    });
});
exports.getAllPublishedArticles = (0, catchAsync_1.default)(async (_req, res) => {
    const result = await article_service_1.ArticleService.getAllPublishedArticles();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "All Published Articles retrieved successfully",
        data: result,
    });
});
exports.getArticleById = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await article_service_1.ArticleService.getArticleById(id);
    (0, sendResponse_1.default)(res, {
        statusCode: result ? http_status_1.default.OK : http_status_1.default.NOT_FOUND,
        success: !!result,
        message: result ? "Article retrieved successfully" : "Article not found",
        data: result,
    });
});
exports.deleteArticle = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const deleted = await article_service_1.ArticleService.deleteArticle(id);
    (0, sendResponse_1.default)(res, {
        statusCode: deleted ? http_status_1.default.OK : http_status_1.default.NOT_FOUND,
        success: !!deleted,
        message: deleted ? "Article deleted successfully" : "Article not found",
        data: null,
    });
});
exports.UpdateStatusArticle = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const update = await article_service_1.ArticleService.UpdateStatusArticle(id);
    (0, sendResponse_1.default)(res, {
        statusCode: update ? http_status_1.default.OK : http_status_1.default.NOT_FOUND,
        success: !!update,
        message: "Article Status Update successfully",
        data: null,
    });
});
exports.updateArticle = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    const deleted = await article_service_1.ArticleService.updateArticle(id, payload);
    (0, sendResponse_1.default)(res, {
        statusCode: deleted ? http_status_1.default.OK : http_status_1.default.NOT_FOUND,
        success: !!deleted,
        message: "Article Status Update successfully",
        data: null,
    });
});
