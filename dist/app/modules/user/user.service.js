"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("./user.model");
const http_status_1 = __importDefault(require("http-status"));
const createAdminIntoDB = async (payload) => {
    try {
        const existingUser = await user_model_1.User.isUserExistsByEmail(payload.email);
        if (existingUser) {
            throw new AppError_1.default(http_status_1.default.CONFLICT, "Admin already exists");
        }
        const adminUser = await user_model_1.User.create({
            ...payload,
            role: "admin",
            needsPasswordChange: payload.needsPasswordChange || "false",
        });
        return adminUser;
    }
    catch (err) {
        throw err;
    }
};
const createUserIntoDB = async (payload) => {
    try {
        const existingUser = await user_model_1.User.isUserExistsByEmail(payload.email);
        if (existingUser) {
            throw new AppError_1.default(http_status_1.default.CONFLICT, "User already exists");
        }
        const newUser = await user_model_1.User.create({
            ...payload,
            role: "user",
            password: config_1.default.admin_password,
            email: config_1.default.admin_email,
            needsPasswordChange: payload.needsPasswordChange || "false",
        });
        return newUser;
    }
    catch (err) {
        throw err;
    }
};
exports.UserService = {
    createUserIntoDB,
    createAdminIntoDB,
};
