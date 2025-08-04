import ProductForm from "@/components/admin/ProductForm/ProductForm";
import { PlusCircle } from "lucide-react";

export default function AddProductPage() {
  return (
    <main className="max-w-2xl mx-auto py-10 px-4">
      <div className="flex items-center gap-2 mb-6">
        <PlusCircle size={22} className="text-orange-600" />
        <h1 className="text-2xl font-bold text-gray-800">Add New Product</h1>
      </div>

      <ProductForm type="add" />
    </main>
  );
}
