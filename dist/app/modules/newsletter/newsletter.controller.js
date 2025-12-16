"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendToAll = exports.deleteNewsletter = exports.updateNewsletter = exports.getNewsletterById = exports.getAllNewsletters = exports.createNewsletter = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const http_status_1 = __importDefault(require("http-status"));
const newsletter_service_1 = require("./newsletter.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
exports.createNewsletter = (0, catchAsync_1.default)(async (req, res) => {
    const result = await newsletter_service_1.NewsletterService.createNewsletter(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Newsletter subscription created successfully",
        data: result,
    });
});
exports.getAllNewsletters = (0, catchAsync_1.default)(async (req, res) => {
    const result = await newsletter_service_1.NewsletterService.getAllNewsletters();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Newsletter list fetched successfully",
        data: result,
    });
});
exports.getNewsletterById = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await newsletter_service_1.NewsletterService.getNewsletterById(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Newsletter fetched successfully",
        data: result,
    });
});
exports.updateNewsletter = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await newsletter_service_1.NewsletterService.updateNewsletter(id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Newsletter updated successfully",
        data: result,
    });
});
exports.deleteNewsletter = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await newsletter_service_1.NewsletterService.deleteNewsletter(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Newsletter deleted successfully",
        data: result,
    });
});
const sendToAll = async (req, res) => {
    try {
        const { subject, html, mode } = req.body;
        if (!subject || !html)
            return res.status(400).json({ message: "subject and html are required" });
        let result;
        if (mode === "bcc") {
            result = await newsletter_service_1.NewsletterService.sendToAllViaBcc(subject, html);
        }
        else {
            result = await newsletter_service_1.NewsletterService.sendToAllInBatches(subject, html);
        }
        return res.json({ ok: true, result });
    }
    catch (err) {
        console.error("sendToAll err:", err);
        return res
            .status(500)
            .json({ ok: false, message: "Server error", error: err });
    }
};
exports.sendToAll = sendToAll;
