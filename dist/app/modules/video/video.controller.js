"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVideo = exports.updateVideo = exports.getVideoById = exports.getAllVideos = exports.createVideo = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const video_service_1 = require("./video.service");
exports.createVideo = (0, catchAsync_1.default)(async (req, res) => {
    const result = await video_service_1.VideoService.createVideo(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Video uploaded successfully",
        data: result,
    });
});
exports.getAllVideos = (0, catchAsync_1.default)(async (req, res) => {
    const result = await video_service_1.VideoService.getAllVideos();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Videos fetched successfully",
        data: result,
    });
});
exports.getVideoById = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await video_service_1.VideoService.getVideoById(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Video fetched successfully",
        data: result,
    });
});
exports.updateVideo = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await video_service_1.VideoService.updateVideo(id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Video updated successfully",
        data: result,
    });
});
exports.deleteVideo = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await video_service_1.VideoService.deleteVideo(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Video deleted successfully",
        data: result,
    });
});
