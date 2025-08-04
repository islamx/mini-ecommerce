"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/lib/products";
import AdminTable from "@/components/admin/AdminTable";
import Pagination from "@/components/shared/Pagination";
import LoadingContainer from "@/components/shared/LoadingContainer";
import EmptyState from "@/components/shared/EmptyState";
import AdminFilter from "@/components/admin/AdminFilter";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Product } from "@/types/Product";

export default function AdminPageContent() {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");
  
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState({ page: 1, total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

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

  // Filter products based on search
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="max-w-7xl mx-auto py-10 px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Admin - Product Management</h1>

        <Link
          href="/admin/add"
          className="inline-flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition-colors w-full sm:w-auto justify-center"
        >
          <PlusCircle size={18} />
          <span>Add Product</span>
        </Link>
      </div>

      {loading ? (
        <LoadingContainer text="Loading products..." />
      ) : products.length === 0 ? (
        <EmptyState
          title="No products found"
          description="You haven't added any products yet. Start by creating your first product to manage your inventory."
          icon="products"
          primaryAction={{
            label: "Add First Product",
            href: "/admin/add"
          }}
        />
      ) : (
        <>
          <AdminFilter 
            search={search}
            onSearchChange={setSearch}
          />

          {filteredProducts.length === 0 && search ? (
            <EmptyState
              title="No products found"
              description={`We couldn't find any products matching "${search}". Try adjusting your search terms or browse all products.`}
              icon="search"
              primaryAction={{
                label: "Clear Search",
                onClick: () => setSearch("")
              }}
              secondaryAction={{
                label: "Add New Product",
                href: "/admin/add"
              }}
            />
          ) : (
            <>
              <AdminTable products={products} search={search} onSearchChange={setSearch} />

              {filteredProducts.length > 0 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={pagination.totalPages}
                  baseUrl="/admin"
                />
              )}
            </>
          )}
        </>
      )}
    </main>
  );
} 