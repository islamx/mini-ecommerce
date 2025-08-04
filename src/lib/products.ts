import { Product } from "@/types/Product";

export async function getProducts({
  page = 1,
  limit = 8,
  isAdmin = false,
}: {
  page?: number;
  limit?: number;
  isAdmin?: boolean;
}): Promise<{
  data: Product[];
  pagination: {
    page: number;
    total: number;
    totalPages: number;
  };
}> {
  const res = await fetch(
    `http://localhost:3000/api/products?page=${page}&limit=${limit}`,
    {
      // 👇 admin = no caching
      ...(isAdmin ? { cache: "no-store" } : { next: { revalidate: 10 } }),
    }
  );

  if (!res.ok) throw new Error("Failed to fetch products");

  return res.json();
}

export async function deleteProduct(id: number): Promise<{ message: string }> {
  const res = await fetch(`/api/products/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete product");

  return res.json();
}
