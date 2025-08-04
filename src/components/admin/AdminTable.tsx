"use client";

import { Product } from "@/types/Product";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";

export default function AdminTable({ products }: { products: Product[] }) {
  const router = useRouter();

  const handleDelete = (id: number) => {
    toast("TODO: delete product " + id);
    // 🔜 هنا هيتم ربط API الحذف لاحقًا
  };

  return (
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
          {products.map((product) => (
            <tr
              key={product.id}
              className="border-t border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <td className="p-3 whitespace-nowrap">{product.id}</td>
              <td className="p-3 whitespace-nowrap">{product.title}</td>
              <td className="p-3 whitespace-nowrap">{product.price} E£</td>
              <td className="p-3 whitespace-nowrap">{product.category || "—"}</td>
              <td className="p-3 flex items-center gap-3">
                <button
                  onClick={() => router.push(`/admin/edit/${product.id}`)}
                  className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  title="Edit"
                >
                  <Pencil size={16} />
                  <span className="hidden sm:inline">Edit</span>
                </button>

                <button
                  onClick={() => handleDelete(product.id)}
                  className="text-red-600 hover:text-red-800 flex items-center gap-1"
                  title="Delete"
                >
                  <Trash2 size={16} />
                  <span className="hidden sm:inline">Delete</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
