// src/app/modules/article/article.controller.ts
import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ArticleService } from "./article.service";

export const saveDraft = catchAsync(async (req: Request, res: Response) => {
  const result = await ArticleService.saveDraft(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Draft saved successfully",
    data: result,
  });
});

export const publishArticle = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ArticleService.publishArticle(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Article published successfully",
      data: result,
    });
  }
);

export const getAllArticles = catchAsync(
  async (_req: Request, res: Response) => {
    const result = await ArticleService.getAllArticles();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Articles retrieved successfully",
      data: result,
    });
  }
);
export const getAllPublishedArticles = catchAsync(
  async (_req: Request, res: Response) => {
    const result = await ArticleService.getAllPublishedArticles();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "All Published Articles retrieved successfully",
      data: result,
    });
  }
);

export const getArticleById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ArticleService.getArticleById(id);

    sendResponse(res, {
      statusCode: result ? httpStatus.OK : httpStatus.NOT_FOUND,
      success: !!result,
      message: result ? "Article retrieved successfully" : "Article not found",
      data: result,
    });
  }
);

export const deleteArticle = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = await ArticleService.deleteArticle(id);

  sendResponse(res, {
    statusCode: deleted ? httpStatus.OK : httpStatus.NOT_FOUND,
    success: !!deleted,
    message: deleted ? "Article deleted successfully" : "Article not found",
    data: null,
  });
});
export const UpdateStatusArticle = catchAsync(async (req, res) => {
  const { id } = req.params;
  const update = await ArticleService.UpdateStatusArticle(id);

  sendResponse(res, {
    statusCode: update ? httpStatus.OK : httpStatus.NOT_FOUND,
    success: !!update,
    message: "Article Status Update successfully",
    data: null,
  });
});
export const updateArticle = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const deleted = await ArticleService.updateArticle(id, payload);

  sendResponse(res, {
    statusCode: deleted ? httpStatus.OK : httpStatus.NOT_FOUND,
    success: !!deleted,
    message: "Article Status Update successfully",
    data: null,
  });
});

export const uploadArticleImage = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!req.file) throw new Error("No file uploaded");
    const imagePath = `/uploads/${req.file.filename}`;
    const result = await ArticleService.uploadImage(id, imagePath);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Image uploaded successfully",
      data: result,
    });
  }
);
