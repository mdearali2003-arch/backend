"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../modules/user/user.model");
const auth = (...requiredRoles) => {
    return (0, catchAsync_1.default)(async (req, res, next) => {
        const token = req.headers.authorization;
        // if the token is not provided from the client
        if (!token) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized to access this route");
        }
        let decoded;
        try {
            decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_secret);
        }
        catch (error) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized to access this route");
        }
        const { role, email, iat } = decoded;
        const user = await user_model_1.User.isUserExistsByEmail(email);
        if (!user) {
            if (!user) {
                throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This user is not found !");
            }
        }
        if (user.passwordChangeAt &&
            user_model_1.User.isJWTIssuedBeforePasswordChanged(user.passwordChangeAt, iat)) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized !");
        }
        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized to access this route");
        }
        req.user = decoded;
        next();
    });
};
exports.default = auth;
