"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleRoutes = void 0;
const express_1 = require("express");
const controller = __importStar(require("./article.controller"));
const validateRequest_1 = require("../../middlewares/validateRequest");
const article_validation_1 = require("./article.validation");
const router = (0, express_1.Router)();
// Draft
router.post("/draft", (0, validateRequest_1.validateRequest)(article_validation_1.createDraftSchema), controller.saveDraft);
// Publish
router.post("/publish", (0, validateRequest_1.validateRequest)(article_validation_1.publishArticleSchema), controller.publishArticle);
// Get all
router.get("/", controller.getAllArticles);
router.get("/published", controller.getAllPublishedArticles);
// Get by ID
router.get("/:id", controller.getArticleById);
// Delete
router.delete("/:id", controller.deleteArticle);
router.patch("/:id/publish", controller.UpdateStatusArticle);
router.patch("/:id", controller.updateArticle);
exports.ArticleRoutes = router;
