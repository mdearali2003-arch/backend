import { Newsletter } from "./newsletter.model";
import { INewsletter, SendResult } from "./newsletter.interface";
import transporter from "../../utils/mailer";

const createNewsletter = async (payload: INewsletter) => {
  const result = await Newsletter.create(payload);
  return result;
};

const getAllNewsletters = async () => {
  const result = await Newsletter.find();
  return result;
};

const getNewsletterById = async (id: string) => {
  const result = await Newsletter.findById(id);
  return result;
};

const updateNewsletter = async (id: string, payload: Partial<INewsletter>) => {
  const result = await Newsletter.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteNewsletter = async (id: string) => {
  const result = await Newsletter.findByIdAndDelete(id);
  return result;
};

const sendToAllViaBcc = async (
  subject: string,
  html: string
): Promise<SendResult> => {
  const docs = await Newsletter.find({}, "email -_id").lean();
  const emails = docs.map((d) => d.email);

  if (emails.length === 0) return { sent: 0, failed: 0 };

  try {
    const info = await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: process.env.MAIL_FROM,
      bcc: emails,
      subject,
      html,
    });
    return { sent: emails.length, failed: 0, info };
  } catch (error) {
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
const sendToAllInBatches = async (
  subject: string,
  htmlTemplate: string
): Promise<SendResult> => {
  const docs = await Newsletter.find({}, "email -_id").lean();
  const emails = docs.map((d) => d.email);
  const CHUNK_SIZE = 50;
  let sent = 0;
  let failed = 0;
  const errors: Array<{ email: string; error: any }> = [];

  // Optional: personalize template with unsubscribe link
  const buildHtml = (email: string) => {
    const unsubscribeUrl = `${
      process.env.FRONTEND_URL
    }/unsubscribe?email=${encodeURIComponent(email)}`;
    // user can replace {{unsubscribe}} placeholder in template, or we just append link
    return (
      htmlTemplate.replace("{{unsubscribeUrl}}", unsubscribeUrl) +
      `<p><a href="${unsubscribeUrl}">Unsubscribe</a></p>`
    );
  };

  for (let i = 0; i < emails.length; i += CHUNK_SIZE) {
    const chunk = emails.slice(i, i + CHUNK_SIZE);

    // send concurrently within chunk
    await Promise.all(
      chunk.map(async (email) => {
        try {
          await transporter.sendMail({
            from: process.env.MAIL_FROM,
            to: email,
            subject,
            html: buildHtml(email),
          });
          sent++;
        } catch (error) {
          failed++;
          errors.push({ email, error });
        }
      })
    );

    // optional small delay between chunks to avoid throttle
    await new Promise((res) => setTimeout(res, 800));
  }

  return { sent, failed, errors };
};

export const NewsletterService = {
  createNewsletter,
  getAllNewsletters,
  getNewsletterById,
  updateNewsletter,
  deleteNewsletter,
  sendToAllViaBcc,
  sendToAllInBatches,
};
