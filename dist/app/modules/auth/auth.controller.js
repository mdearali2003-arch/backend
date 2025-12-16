"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const auth_service_1 = require("./auth.service");
const http_status_1 = __importDefault(require("http-status"));
const loginUser = (0, catchAsync_1.default)(async (req, res) => {
    const result = await auth_service_1.AuthService.loginUser(req.body);
    //set refreshToken in cookie
    const { refreshToken, accessToken, needsPasswordChange } = result;
    res.cookie("refreshToken", refreshToken, {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
    });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User is logged in successfully!",
        data: {
            accessToken,
            needsPasswordChange,
        },
    });
});
const refreshToken = (0, catchAsync_1.default)(async (req, res) => {
    const { refreshToken } = req.cookies;
    const result = await auth_service_1.AuthService.refreshAccessToken(refreshToken);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Refresh-token is retrieved successfully!",
        data: result,
    });
});
exports.AuthController = {
    loginUser,
    refreshToken,
};
