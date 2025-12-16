export interface IProduct {
  name: string;
  slug?: string;
  description?: string;
  price: number;
  discountPrice?: number;
  categories?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
