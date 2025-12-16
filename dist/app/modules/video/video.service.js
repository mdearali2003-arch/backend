"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoService = void 0;
const video_model_1 = require("./video.model");
const createVideo = async (payload) => {
    const result = await video_model_1.Video.create(payload);
    return result;
};
const getAllVideos = async () => {
    const result = await video_model_1.Video.find();
    return result;
};
const getVideoById = async (id) => {
    const result = await video_model_1.Video.findById(id);
    return result;
};
const updateVideo = async (id, payload) => {
    const result = await video_model_1.Video.findByIdAndUpdate(id, payload, { new: true });
    return result;
};
const deleteVideo = async (id) => {
    const result = await video_model_1.Video.findByIdAndDelete(id);
    return result;
};
exports.VideoService = {
    createVideo,
    getAllVideos,
    getVideoById,
    updateVideo,
    deleteVideo,
};
