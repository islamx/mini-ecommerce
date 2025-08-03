import { Product } from "@/types/Product";

export async function getProducts(): Promise<Product[]> {
  const res = await fetch("http://localhost:3000/api/products", {
    next: { revalidate: 10 }, // ISR
  });

  if (!res.ok) throw new Error("Failed to fetch products");

  return res.json();
} 