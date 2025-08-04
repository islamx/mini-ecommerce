import ProductForm from "@/components/admin/ProductForm/ProductForm";
import Breadcrumb from "@/components/Breadcrumb";
import { PlusCircle, Package } from "lucide-react";

export default function AddProductPage() {
  return (
    <main className="max-w-4xl mx-auto py-8 px-4">
      <Breadcrumb currentPage="Add Product" isAdmin={true} />
      
      <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-6 mb-8 border border-orange-100">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-orange-100 rounded-lg">
            <PlusCircle size={24} className="text-orange-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Add New Product</h1>
            <p className="text-gray-600 mt-1">Create a new product for your store</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Package size={20} className="text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-800">Product Information</h2>
          </div>
        </div>
        <div className="p-6">
          <ProductForm type="add" />
        </div>
      </div>
    </main>
  );
}
