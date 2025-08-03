export interface Product {
  _id: string;
  id: number;
  title: string;
  description: string;
  price: number;
  category?: string;
  imageUrl: string;
  createdAt: string;
}
