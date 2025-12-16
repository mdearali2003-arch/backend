import { IArticle } from "./article.interface";
import { Article } from "./article.model";

const saveDraft = async (payload: Pick<IArticle, "title" | "content">) => {
  const result = await Article.create({
    ...payload,
    status: "draft",
  });
  return result;
};

const publishArticle = async (payload: Pick<IArticle, "title" | "content">) => {
  const result = await Article.create({
    ...payload,
    status: "published",
  });
  return result;
};

const getAllArticles = async () => {
  const result = await Article.find().sort({ createdAt: -1 });
  return result;
};
const getAllPublishedArticles = async () => {
  const result = await Article.find({ status: "published" }).sort({
    createdAt: -1,
  });
  return result;
};

const getArticleById = async (id: string) => {
  const result = await Article.findById(id);
  return result;
};

const updateArticle = async (
  id: string,
  payload: Partial<Pick<IArticle, "title" | "content" | "status">>
) => {
  const result = await Article.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteArticle = async (id: string) => {
  const result = await Article.findByIdAndDelete(id);
  return result;
};
const UpdateStatusArticle = async (id: string) => {
  const result = await Article.findByIdAndUpdate(
    id,
    { status: "published" },
    { new: true, runValidators: true }
  );
  return result;
};

const uploadImage = async (id: string, imagePath: string) => {
  return await Article.findByIdAndUpdate(
    id,
    { image: imagePath },
    { new: true }
  );
};

export const ArticleService = {
  saveDraft,
  publishArticle,
  getAllArticles,
  getAllPublishedArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
  UpdateStatusArticle,
  uploadImage,
};
