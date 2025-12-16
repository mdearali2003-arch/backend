"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../user/user.model");
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginUser = async (payload) => {
    const user = await user_model_1.User.isUserExistsByEmail(payload.email);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This user is not found !");
    }
    if (!(await user_model_1.User.isPasswordMatched(payload?.password, user?.password))) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Password does not match");
    }
    const jwtPayload = {
        _id: user.id,
        email: user.email,
        role: user.role,
    };
    // Access Token
    const accessToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_secret, {
        expiresIn: "1d", // e.g. "15m"
    });
    // Refresh Token
    const refreshToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_refresh_secret, {
        expiresIn: "365d", // e.g. "7d"
    });
    return {
        accessToken,
        refreshToken,
        needsPasswordChange: user?.needsPasswordChange,
    };
};
const refreshAccessToken = async (token) => {
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_refresh_secret);
    const { email, iat } = decoded;
    const user = await user_model_1.User.isUserExistsByEmail(email);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This user is not found !");
    }
    if (user.passwordChangeAt &&
        user_model_1.User.isJWTIssuedBeforePasswordChanged(user.passwordChangeAt, iat)) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized !");
    }
    const jwtPayload = {
        _id: user.id,
        email: user.email,
        role: user.role,
    };
    const accessToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_secret, {
        expiresIn: "1d",
    });
    return {
        accessToken,
    };
};
exports.AuthService = {
    loginUser,
    refreshAccessToken,
};
