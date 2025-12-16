"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsletterService = void 0;
const newsletter_model_1 = require("./newsletter.model");
const mailer_1 = __importDefault(require("../../utils/mailer"));
const createNewsletter = async (payload) => {
    const result = await newsletter_model_1.Newsletter.create(payload);
    return result;
};
const getAllNewsletters = async () => {
    const result = await newsletter_model_1.Newsletter.find();
    return result;
};
const getNewsletterById = async (id) => {
    const result = await newsletter_model_1.Newsletter.findById(id);
    return result;
};
const updateNewsletter = async (id, payload) => {
    const result = await newsletter_model_1.Newsletter.findByIdAndUpdate(id, payload, { new: true });
    return result;
};
const deleteNewsletter = async (id) => {
    const result = await newsletter_model_1.Newsletter.findByIdAndDelete(id);
    return result;
};
const sendToAllViaBcc = async (subject, html) => {
    const docs = await newsletter_model_1.Newsletter.find({}, "email -_id").lean();
    const emails = docs.map((d) => d.email);
    if (emails.length === 0)
        return { sent: 0, failed: 0 };
    try {
        const info = await mailer_1.default.sendMail({
            from: process.env.MAIL_FROM,
            to: process.env.MAIL_FROM,
            bcc: emails,
            subject,
            html,
        });
        return { sent: emails.length, failed: 0, info };
    }
    catch (error) {
        return {
            sent: 0,
            failed: emails.length,
            errors: [{ email: "all", error }],
        };
    }
};
/**
 * Recommended: chunked/batched sends with concurrency control
 */
const sendToAllInBatches = async (subject, htmlTemplate) => {
    const docs = await newsletter_model_1.Newsletter.find({}, "email -_id").lean();
    const emails = docs.map((d) => d.email);
    const CHUNK_SIZE = 50;
    let sent = 0;
    let failed = 0;
    const errors = [];
    // Optional: personalize template with unsubscribe link
    const buildHtml = (email) => {
        const unsubscribeUrl = `${process.env.FRONTEND_URL}/unsubscribe?email=${encodeURIComponent(email)}`;
        // user can replace {{unsubscribe}} placeholder in template, or we just append link
        return (htmlTemplate.replace("{{unsubscribeUrl}}", unsubscribeUrl) +
            `<p><a href="${unsubscribeUrl}">Unsubscribe</a></p>`);
    };
    for (let i = 0; i < emails.length; i += CHUNK_SIZE) {
        const chunk = emails.slice(i, i + CHUNK_SIZE);
        // send concurrently within chunk
        await Promise.all(chunk.map(async (email) => {
            try {
                await mailer_1.default.sendMail({
                    from: process.env.MAIL_FROM,
                    to: email,
                    subject,
                    html: buildHtml(email),
                });
                sent++;
            }
            catch (error) {
                failed++;
                errors.push({ email, error });
            }
        }));
        // optional small delay between chunks to avoid throttle
        await new Promise((res) => setTimeout(res, 800));
    }
    return { sent, failed, errors };
};
exports.NewsletterService = {
    createNewsletter,
    getAllNewsletters,
    getNewsletterById,
    updateNewsletter,
    deleteNewsletter,
    sendToAllViaBcc,
    sendToAllInBatches,
};
