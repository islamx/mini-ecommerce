import { Product } from "@/types/Product";
import Image from "next/image";

async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`http://localhost:3000/api/products/${id}`, {
    next: { revalidate: 10 },
  });

  if (!res.ok) throw new Error("Failed to fetch product");

  return res.json();
}

type ProductDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const product = await getProduct(id);

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden md:flex">
        {/* Image */}
        <div className="relative w-full md:w-1/2 h-64 md:h-auto">
          <Image
            src={product.imageUrl}
            alt={product.title}
            fill
            className="object-cover"
            loading="lazy"
          />
        </div>

        {/* Info */}
        <div className="p-6 flex flex-col gap-4 flex-1">
          <h1 className="text-2xl font-bold text-gray-800">{product.title}</h1>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-gray-800 font-semibold">
            Price: {product.price.toLocaleString()} €
          </p>
          {product.category && (
            <p className="text-sm text-gray-500">Category: {product.category}</p>
          )}
          <button className="mt-auto bg-[#F4D8B4] hover:bg-[#E8C8A0] text-gray-800 font-semibold py-3 px-6">
            ADD TO CART
          </button>
        </div>
      </div>
    </main>
  );
}
