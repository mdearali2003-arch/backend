"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNewsletterSchema = exports.createNewsletterSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createNewsletterSchema = zod_1.default.object({
    email: zod_1.default.string().email("Invalid email address"),
});
exports.updateNewsletterSchema = zod_1.default.object({
    email: zod_1.default.string().email("Invalid email address").optional(),
});
