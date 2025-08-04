import ProductForm from "@/components/admin/ProductForm/ProductForm";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { Pencil, Package, Edit3 } from "lucide-react";
import { dbConnect } from "@/lib/dbConnect";
import { Product as ProductModel } from "@/models/Product";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  try {
    await dbConnect();
    const product = await ProductModel.findOne({ id: Number(id) });

    if (!product) {
      throw new Error('Product not found');
    }

    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-4xl mx-auto py-3 sm:py-6 lg:py-8 px-3 sm:px-6 lg:px-8">
          <Breadcrumb currentPage="Edit Product" isAdmin={true} />
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 sm:p-6 mb-4 sm:mb-8 border border-blue-100">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg self-start sm:self-auto">
                <Pencil size={18} className="sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold text-gray-800">Edit Product #{product.id}</h1>
                <p className="text-xs sm:text-base text-gray-600 mt-1">Update product information</p>
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
              <ProductForm type="edit" initialValues={product} />
            </div>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error("Edit product error:", error);
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-4xl mx-auto py-3 sm:py-6 lg:py-8 px-3 sm:px-6 lg:px-8">
          <Breadcrumb currentPage="Edit Product" isAdmin={true} />
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-6 text-red-600">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
              <div className="p-2 bg-red-100 rounded-lg self-start sm:self-auto">
                <Edit3 size={18} className="sm:w-5 sm:h-5" />
              </div>
              <div className="flex-1">
                <span className="font-semibold text-sm sm:text-base">Failed to load product with ID {id}</span>
                <p className="text-xs sm:text-sm mt-1 text-red-500">
                  This product might not exist or there was a connection error.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
