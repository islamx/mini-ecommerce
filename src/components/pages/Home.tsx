"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Pagination from "@/components/Pagination";
import ProductCard from "@/components/products/ProductCard";
import Loader from "@/components/Loader";
import { getProducts } from "@/lib/products";
import { Product } from "@/types/Product";
import { notFound } from "next/navigation";

function isValidPage(page: string | null): boolean {
  return !!page && !isNaN(+page) && Number(page) >= 1;
}

export default function HomePageContent() {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page");
  
  // Check if page parameter is valid
  if (pageParam && !isValidPage(pageParam)) {
    notFound();
  }
  
  const currentPage = isValidPage(pageParam) ? parseInt(pageParam!) : 1;

  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getProducts({ page: currentPage, limit: 7, isAdmin: false }).then(
      ({ data, pagination }) => {
        if (mounted) {
          setProducts(data);
          setTotalPages(pagination.totalPages);
          
          // Check if current page exceeds total pages
          if (currentPage > pagination.totalPages && pagination.totalPages > 0) {
            notFound();
          }
          
          setLoading(false);
        }
      }
    ).catch(() => {
      if (mounted) {
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, [currentPage]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-gray-300 to-transparent rounded-t-full transform scale-x-150"></div>
        <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-gray-400 to-transparent rounded-t-full transform scale-x-200 translate-x-1/4"></div>
      </div>

      <div className="relative z-10 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white shadow-2xl p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center text-gray-800">
              Our Products Collection
            </h1>

            {loading ? (
              <Loader text="Loading products..." />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product, index) => (
                  <div
                    key={product._id}
                    className={index === 4 ? "lg:col-span-2" : ""}
                  >
                    <ProductCard {...product} index={index} />
                  </div>
                ))}
              </div>
            )}

            <Pagination currentPage={currentPage} totalPages={totalPages} />
          </div>
        </div>
      </div>
    </main>
  );
}

