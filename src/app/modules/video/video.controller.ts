import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { VideoService } from "./video.service";

export const createVideo = catchAsync(async (req, res) => {
  const result = await VideoService.createVideo(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Video uploaded successfully",
    data: result,
  });
});

export const getAllVideos = catchAsync(async (req, res) => {
  const result = await VideoService.getAllVideos();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Videos fetched successfully",
    data: result,
  });
});

export const getVideoById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await VideoService.getVideoById(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Video fetched successfully",
    data: result,
  });
});

export const updateVideo = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await VideoService.updateVideo(id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Video updated successfully",
    data: result,
  });
});

export const deleteVideo = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await VideoService.deleteVideo(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Video deleted successfully",
    data: result,
  });
});

// 🆕 Category wise filter controller
export const getVideosByCategory = catchAsync(async (req, res) => {
  const { category } = req.params;

  const result = await VideoService.getVideosByCategory(category);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: `Videos fetched for category: ${category}`,
    data: result,
  });
});
