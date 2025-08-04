"use client";

import { Product } from "@/types/Product";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { deleteProduct } from "@/lib/products";
import { useState } from "react";
import ConfirmDeleteModal from "../shared/ConfirmDeleteModal";
import ProductFilter from "@/components/products/ProductFilter";
import Button from "../forms/Button";

export default function AdminTable({ products }: { products: Product[] }) {
  const router = useRouter();
  const [data, setData] = useState(products);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleDeleteConfirmed = async () => {
    if (!selectedId) return;

    try {
      await deleteProduct(selectedId);
      toast.success("Product deleted successfully");
      setData((prev) => prev.filter((p) => p.id !== selectedId));
      setSelectedId(null);
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  const filtered = data.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <ProductFilter 
        search={search}
        onSearchChange={setSearch}
      />

      <div className="overflow-x-auto rounded-lg bg-white shadow-lg border border-gray-200">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gradient-to-r from-orange-50 to-orange-100 text-gray-800 uppercase text-xs font-semibold">
            <tr>
              <th className="p-4 text-left whitespace-nowrap border-b border-orange-200">ID</th>
              <th className="p-4 text-left whitespace-nowrap border-b border-orange-200">Title</th>
              <th className="p-4 text-left whitespace-nowrap border-b border-orange-200">Price</th>
              <th className="p-4 text-left whitespace-nowrap border-b border-orange-200">Category</th>
              <th className="p-4 text-left whitespace-nowrap border-b border-orange-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((product) => (
                <tr
                  key={product.id}
                  className="border-t border-gray-100 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-25 transition-all duration-200"
                >
                  <td className="p-4 whitespace-nowrap font-medium text-gray-900">{product.id}</td>
                  <td className="p-4 whitespace-nowrap font-medium">{product.title}</td>
                  <td className="p-4 whitespace-nowrap font-semibold text-green-600">{product.price} E£</td>
                  <td className="p-4 whitespace-nowrap text-gray-600">{product.category || "—"}</td>
                  <td className="p-3">
                                         <div className="flex items-center gap-2">
                       <Button
                         variant="secondary"
                         size="sm"
                         onClick={() => router.push(`/admin/edit/${product.id}`)}
                         title="Edit Product"
                         className="flex items-center gap-1"
                       >
                         <Pencil size={16} />
                         <span className="hidden sm:inline">Edit</span>
                       </Button>

                       <Button
                         variant="danger"
                         size="sm"
                         onClick={() => setSelectedId(product.id)}
                         title="Delete Product"
                         className="flex items-center gap-1"
                       >
                         <Trash2 size={16} />
                         <span className="hidden sm:inline">Delete</span>
                       </Button>
                     </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ConfirmDeleteModal
        isOpen={selectedId !== null}
        onConfirm={handleDeleteConfirmed}
        onClose={() => setSelectedId(null)}
      />
    </>
  );
}
