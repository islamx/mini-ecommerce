"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Pagination from "@/components/shared/Pagination";
import ProductCard from "@/components/products/ProductCard";
import LoadingContainer from "@/components/shared/LoadingContainer";
import ProductFilter from "@/components/products/ProductFilter";
import { getProducts } from "@/lib/products";
import { Product } from "@/types/Product";
import { notFound } from "next/navigation";

function isValidPage(page: string | null): boolean {
  return !!page && !isNaN(+page) && Number(page) >= 1;
}

export default function HomePageContent() {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page");
  
  // Check if page parameter is valid
  if (pageParam && !isValidPage(pageParam)) {
    notFound();
  }
  
  const currentPage = isValidPage(pageParam) ? parseInt(pageParam!) : 1;

  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [filterLoading, setFilterLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setFilterLoading(true);
    
    // Get filter parameters from URL
    const name = searchParams.get("name");
    const category = searchParams.get("category");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    
    getProducts({ 
      page: currentPage, 
      limit: 7, 
      isAdmin: false,
      name: name || undefined,
      category: category || undefined,
      minPrice: minPrice || undefined,
      maxPrice: maxPrice || undefined,
    }).then(
      ({ data, pagination }) => {
        if (mounted) {
          setProducts(data);
          setTotalPages(pagination.totalPages);
          
          // Check if current page exceeds total pages
          if (currentPage > pagination.totalPages && pagination.totalPages > 0) {
            notFound();
          }
          
          setLoading(false);
          setFilterLoading(false);
        }
      }
    ).catch(() => {
      if (mounted) {
        setLoading(false);
        setFilterLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, [currentPage, searchParams]);

  // Get categories and max price on component mount
  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        // Get all products to extract categories and max price
        const { data } = await getProducts({ limit: 1000, isAdmin: false });
        
        // Extract unique categories
        const uniqueCategories = [...new Set(data.map(product => product.category).filter((cat): cat is string => Boolean(cat)))];
        setCategories(uniqueCategories);
        
        // Get max price
        const maxProductPrice = Math.max(...data.map(product => product.price));
        setMaxPrice(maxProductPrice);
      } catch (error) {
        console.error("Failed to fetch filter data:", error);
      }
    };
    
    fetchFilterData();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-gray-300 to-transparent rounded-t-full transform scale-x-150"></div>
        <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-gray-400 to-transparent rounded-t-full transform scale-x-200 translate-x-1/4"></div>
      </div>

      <div className="relative z-10 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white shadow-2xl p-8 md:p-12">
                         <div className="mb-12">
               {/* Modern split design */}
               <div className="flex flex-col md:flex-row items-center justify-between mb-8">
                 <div className="text-left mb-6 md:mb-0">
                   <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2">
                     Our Products
                   </h1>
                   <div className="flex items-center gap-3">
                     <div className="w-12 h-0.5 bg-orange-500"></div>
                     <span className="text-orange-600 font-semibold text-lg">Collection</span>
                   </div>
                 </div>
                 
                 <div className="flex items-center gap-4">
                   <div className="text-center">
                     <div className="text-2xl font-bold text-gray-900">50+</div>
                     <div className="text-sm text-gray-500">Products</div>
                   </div>
                   <div className="w-px h-8 bg-gray-300"></div>
                   <div className="text-center">
                     <div className="text-2xl font-bold text-gray-900">4.9★</div>
                     <div className="text-sm text-gray-500">Rating</div>
                   </div>
                 </div>
               </div>
               
                            <p className="text-gray-600 text-center md:text-left">
               Discover our curated selection of premium products
             </p>
           </div>

           {/* Product Filter */}
           <ProductFilter categories={categories} maxPrice={maxPrice} isLoading={filterLoading} />

            {loading ? (
              <LoadingContainer text="Loading products..." />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product, index) => (
                  <div
                    key={product._id}
                    className={index === 4 ? "lg:col-span-2" : ""}
                  >
                    <ProductCard {...product} index={index} />
                  </div>
                ))}
              </div>
            )}

            <Pagination currentPage={currentPage} totalPages={totalPages} />
          </div>
        </div>
      </div>
    </main>
  );
}

