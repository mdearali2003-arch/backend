"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_1 = __importDefault(require("../utils/ApiError"));
exports.default = (err, req, res, next) => {
    console.error(err);
    if (err instanceof ApiError_1.default) {
        return res
            .status(err.statusCode)
            .json({ success: false, message: err.message });
    }
    // mongoose validation error handling (simplified)
    if (err.name === "ValidationError") {
        return res.status(400).json({ success: false, message: err.message });
    }
    res
        .status(err.status || 500)
        .json({ success: false, message: err.message || "Internal Server Error" });
};
