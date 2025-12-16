import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import httpStatus from "http-status";
import { NewsletterService } from "./newsletter.service";
import sendResponse from "../../utils/sendResponse";

export const createNewsletter = catchAsync(async (req, res) => {
  const result = await NewsletterService.createNewsletter(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Newsletter subscription created successfully",
    data: result,
  });
});

export const getAllNewsletters = catchAsync(
  async (req: Request, res: Response) => {
    const result = await NewsletterService.getAllNewsletters();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Newsletter list fetched successfully",
      data: result,
    });
  }
);

export const getNewsletterById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await NewsletterService.getNewsletterById(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Newsletter fetched successfully",
      data: result,
    });
  }
);

export const updateNewsletter = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await NewsletterService.updateNewsletter(id, req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Newsletter updated successfully",
      data: result,
    });
  }
);

export const deleteNewsletter = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await NewsletterService.deleteNewsletter(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Newsletter deleted successfully",
      data: result,
    });
  }
);

export const sendToAll = async (req: Request, res: Response) => {
  try {
    const { subject, html, mode } = req.body;
    if (!subject || !html)
      return res.status(400).json({ message: "subject and html are required" });

    let result;
    if (mode === "bcc") {
      result = await NewsletterService.sendToAllViaBcc(subject, html);
    } else {
      result = await NewsletterService.sendToAllInBatches(subject, html);
    }

    return res.json({ ok: true, result });
  } catch (err) {
    console.error("sendToAll err:", err);
    return res
      .status(500)
      .json({ ok: false, message: "Server error", error: err });
  }
};
