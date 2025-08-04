import { Product } from "@/types/Product";
import ProductForm from "@/components/admin/ProductForm/ProductForm";
import { Pencil } from "lucide-react";

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const res = await fetch(`http://localhost:3000/api/products/${params.id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="max-w-2xl mx-auto py-10 px-4 text-red-600">
        ❌ Failed to load product with ID {params.id}
      </div>
    );
  }

  const product: Product = await res.json();

  return (
    <main className="max-w-2xl mx-auto py-10 px-4">
      <div className="flex items-center gap-2 mb-6">
        <Pencil size={22} className="text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-800">Edit Product #{product.id}</h1>
      </div>

      <ProductForm type="edit" initialValues={product} />
    </main>
  );
}
