export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  category?: string;
  imageUrl: string;
  createdAt: string;
}
