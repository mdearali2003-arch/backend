"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadRoutes = void 0;
const express_1 = require("express");
// check relative path
const upload_middleware_1 = __importDefault(require("../../middlewares/upload.middleware"));
const upload_controller_1 = require("./upload.controller");
const router = (0, express_1.Router)();
router.post("/", upload_middleware_1.default.single("image"), (req, res, next) => {
    console.log("Middleware passed, req.file:", req.file);
    next(); // আগের controller call হবে
}, upload_controller_1.uploadImage);
exports.UploadRoutes = router;
