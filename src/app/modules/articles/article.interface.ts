export interface IArticle {
  id?: string;
  title: string;
  content: string;
  image?: string;
  status?: "draft" | "published";
  createdAt?: Date;
  updatedAt?: Date;
}
