import { Product } from "@/types/Product";

export async function getProducts({
  page = 1,
  limit = 8,
  isAdmin = false,
  name,
  category,
  minPrice,
  maxPrice,
}: {
  page?: number;
  limit?: number;
  isAdmin?: boolean;
  name?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
}): Promise<{
  data: Product[];
  pagination: {
    page: number;
    total: number;
    totalPages: number;
  };
}> {
  const params = new URLSearchParams();
  params.set("page", page.toString());
  params.set("limit", limit.toString());
  
  if (name) params.set("name", name);
  if (category) params.set("category", category);
  if (minPrice) params.set("minPrice", minPrice);
  if (maxPrice) params.set("maxPrice", maxPrice);

  const res = await fetch(
    `http://localhost:3000/api/products?${params.toString()}`,
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
