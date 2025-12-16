"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), ".env") });
exports.default = {
    bcrypt_salt_rounds: Number(process.env.BCRYPT_SALT_ROUNDS) || 10, // number
    jwt_secret: process.env.JWT_ACCESS_SECRET || "default_secret",
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET || "default_refresh_secret",
    jwt_access_expiration: process.env.JWT_ACCESS_EXPIRATION || "1d", // string
    jwt_refresh_expiration: process.env.JWT_REFRESH_EXPIRATION || "365d", // string
    admin_password: process.env.ADMIN_PASSWORD || "admin123",
    admin_email: process.env.ADMIN_EMAIL || "admin@example.com",
};
