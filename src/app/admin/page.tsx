"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/lib/products";
import AdminTable from "@/components/admin/AdminTable";
import Pagination from "@/components/Pagination";
import Loader from "@/components/Loader";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Product } from "@/types/Product";

export default function AdminPage() {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");
  
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState({ page: 1, total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    getProducts({
      page: currentPage,
      limit: 10,
      isAdmin: true,
    })
      .then(({ data, pagination }) => {
        if (mounted) {
          setProducts(data);
          setPagination(pagination);
          setLoading(false);
        }
      })
      .catch(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [currentPage]);

  return (
    <main className="max-w-7xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin - Product Management</h1>

        <Link
          href="/admin/add"
          className="inline-flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition-colors"
        >
          <PlusCircle size={18} />
          <div>Add Product</div>
        </Link>
      </div>

      {loading ? (
        <Loader text="Loading products..." />
      ) : (
        <>
          <AdminTable products={products} />

          <Pagination
            currentPage={currentPage}
            totalPages={pagination.totalPages}
            baseUrl="/admin"
          />
        </>
      )}
    </main>
  );
}
