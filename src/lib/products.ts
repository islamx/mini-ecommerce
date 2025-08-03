import { Product } from "@/types/Product";

export async function getProducts(page: number = 1, limit: number = 7): Promise<{
  data: Product[];
  pagination: {
    page: number;
    total: number;
    totalPages: number;
  };
}> {
  const res = await fetch(`http://localhost:3000/api/products?page=${page}&limit=${limit}`, {
    next: { revalidate: 10 }, // ISR
  });

  if (!res.ok) throw new Error("Failed to fetch products");

  return res.json();
}
