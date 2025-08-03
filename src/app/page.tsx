import Pagination from "@/components/Pagination";
import ProductCard from "@/components/products/ProductCard";
import { getProducts } from "@/lib/products";

export default async function HomePage({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {
  const currentPage = parseInt(searchParams?.page || "1");
  const { data: products, pagination } = await getProducts(currentPage);

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 relative overflow-hidden">
      {/* Mountain Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-gray-300 to-transparent rounded-t-full transform scale-x-150"></div>
        <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-gray-400 to-transparent rounded-t-full transform scale-x-200 translate-x-1/4"></div>
      </div>

      <div className="relative z-10 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Main White Panel */}
          <div className="bg-white shadow-2xl p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center text-gray-800">
              Our Products Collection
            </h1>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <div
                  key={product._id}
                  className={index === 4 ? "lg:col-span-2" : ""}
                >
                  <ProductCard
                    id={product._id}
                    title={product.title}
                    description={product.description}
                    imageUrl={product.imageUrl}
                    price={product.price}
                    index={index}
                  />
                </div>
              ))}
            </div>
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
