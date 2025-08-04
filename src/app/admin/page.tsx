import { getProducts } from "@/lib/products";
import AdminTable from "@/components/admin/AdminTable";
import Pagination from "@/components/Pagination";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default async function AdminPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = parseInt(params?.page || "1");
  const { data: products, pagination } = await getProducts({
    page: currentPage,
    limit: 10,
    isAdmin: true,
  });

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

      <AdminTable products={products} />

      <Pagination
        currentPage={currentPage}
        totalPages={pagination.totalPages}
        baseUrl="/admin"
      />
    </main>
  );
}
