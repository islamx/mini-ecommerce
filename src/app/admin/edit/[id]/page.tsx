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
      <main className="max-w-4xl mx-auto py-8 px-4">
        <Breadcrumb currentPage="Edit Product" isAdmin={true} />
        
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-8 border border-blue-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Pencil size={24} className="text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Edit Product #{product.id}</h1>
              <p className="text-gray-600 mt-1">Update product information</p>
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
            <ProductForm type="edit" initialValues={product} />
          </div>
        </div>
      </main>
    );
             } catch (error) {
             console.error("Edit product error:", error);
             return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <Breadcrumb currentPage="Edit Product" isAdmin={true} />
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-red-600">
          <div className="flex items-center gap-2">
            <Edit3 size={20} />
            <div>
              <span className="font-semibold">Failed to load product with ID {id}</span>
              <p className="text-sm mt-1 text-red-500">
                This product might not exist or there was a connection error.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
