"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const app_1 = __importDefault(require("./app/app"));
const database_1 = __importDefault(require("./app/config/database"));
if (process.env.MONGO_URI) {
    // serverless environment এ init phase এ DB connect করা হবে (cache ব্যবহার করলে ভালো)
    (0, database_1.default)(process.env.MONGO_URI).catch((err) => console.error("Mongo connect failed:", err));
}
exports.default = app_1.default; // Vercel expects a default export for Node functions / adapters
