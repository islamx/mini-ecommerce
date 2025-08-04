"use client";

import { Product } from "@/types/Product";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { deleteProduct } from "@/lib/products";
import { useState } from "react";
import ConfirmDeleteModal from "../shared/ConfirmDeleteModal";
import ProductFilter from "./ProductFilter";
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

      <div className="overflow-x-auto rounded-md bg-white shadow border border-gray-200">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-orange-100 text-gray-800 uppercase text-xs">
            <tr>
              <th className="p-3 text-left whitespace-nowrap">ID</th>
              <th className="p-3 text-left whitespace-nowrap">Title</th>
              <th className="p-3 text-left whitespace-nowrap">Price</th>
              <th className="p-3 text-left whitespace-nowrap">Category</th>
              <th className="p-3 text-left whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((product) => (
                <tr
                  key={product.id}
                  className="border-t border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="p-3 whitespace-nowrap">{product.id}</td>
                  <td className="p-3 whitespace-nowrap">{product.title}</td>
                  <td className="p-3 whitespace-nowrap">{product.price} E£</td>
                  <td className="p-3 whitespace-nowrap">{product.category || "—"}</td>
                  <td className="p-3 flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => router.push(`/admin/edit/${product.id}`)}
                      title="Edit"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Pencil size={16} />
                      <span className="hidden sm:inline">Edit</span>
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedId(product.id)}
                      title="Delete"
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={16} />
                      <span className="hidden sm:inline">Delete</span>
                    </Button>
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
