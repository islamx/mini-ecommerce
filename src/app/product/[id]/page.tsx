"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Product } from "@/types/Product";
import Image from "next/image";
import Loader from "@/components/Loader";
import Button from "@/components/forms/Button";
import { useHandleAddToCart } from "@/lib/cartUtils";

async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`http://localhost:3000/api/products/${id}`, {
    next: { revalidate: 10 },
  });

  if (!res.ok) throw new Error("Failed to fetch product");

  return res.json();
}

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const handleAddToCart = useHandleAddToCart();

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    getProduct(id)
      .then((data) => {
        if (mounted) {
          setProduct(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (mounted) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-8">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <Loader text="Loading product..." />
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-8">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
            <p className="text-gray-600">{error || "Product not found"}</p>
          </div>
        </div>
      </main>
    );
  }

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
          <Button
            onClick={() => handleAddToCart({
              id: product.id,
              title: product.title,
              price: product.price,
              imageUrl: product.imageUrl,
            })}
            className="mt-auto bg-[#F4D8B4] hover:bg-[#E8C8A0] text-gray-800 font-semibold py-3 px-6"
          >
            ADD TO CART
          </Button>
        </div>
      </div>
    </main>
  );
}
