import ProductForm from "@/components/admin/ProductForm/ProductForm";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { PlusCircle, Package } from "lucide-react";

export default function AddProductPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto py-3 sm:py-6 lg:py-8 px-3 sm:px-6 lg:px-8">
        <Breadcrumb currentPage="Add Product" isAdmin={true} />
        
        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-3 sm:p-6 mb-4 sm:mb-8 border border-orange-100">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
            <div className="p-2 bg-orange-100 rounded-lg self-start sm:self-auto">
              <PlusCircle size={18} className="sm:w-6 sm:h-6 text-orange-600" />
            </div>
            <div className="flex-1">
              <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold text-gray-800">Add New Product</h1>
              <p className="text-xs sm:text-base text-gray-600 mt-1">Create a new product for your store</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-3 sm:px-6 py-2 sm:py-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Package size={16} className="sm:w-5 sm:h-5 text-gray-600" />
              <h2 className="text-sm sm:text-lg font-semibold text-gray-800">Product Information</h2>
            </div>
          </div>
          <div className="p-3 sm:p-6">
            <ProductForm type="add" />
          </div>
        </div>
      </div>
    </main>
  );
}
