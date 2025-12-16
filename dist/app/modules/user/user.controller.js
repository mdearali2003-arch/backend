"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const user_service_1 = require("../user/user.service");
const http_status_1 = __importDefault(require("http-status"));
const createAdmin = (0, catchAsync_1.default)(async (req, res, next) => {
    const result = await user_service_1.UserService.createAdminIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Admin  Created Successfully",
        data: result,
    });
});
const createUser = (0, catchAsync_1.default)(async (req, res, next) => {
    const result = await user_service_1.UserService.createUserIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User  Created Successfully",
        data: result,
    });
});
exports.UserController = {
    createAdmin,
    createUser,
};
