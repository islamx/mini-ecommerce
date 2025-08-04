"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface FilterState {
  name: string;
  category: string;
  minPrice: string;
  maxPrice: string;
}

interface ProductFilterProps {
  categories: string[];
  maxPrice: number;
  isLoading?: boolean;
}

export default function ProductFilter({ categories, maxPrice, isLoading = false }: ProductFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [filters, setFilters] = useState<FilterState>({
    name: searchParams.get("name") || "",
    category: searchParams.get("category") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    
    const params = new URLSearchParams(searchParams);
    
    // Update URL parameters
    Object.entries(updatedFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    
    // Reset to page 1 when filtering
    params.set("page", "1");
    
    router.push(`/?${params.toString()}`);
  };

  const clearFilters = () => {
    setFilters({
      name: "",
      category: "",
      minPrice: "",
      maxPrice: "",
    });
    router.push("/");
  };

  const hasActiveFilters = filters.name || filters.category || filters.minPrice || filters.maxPrice;

  return (
    <div className="mb-6">
      {/* Filter Toggle Button */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-gray-700 hover:text-orange-600 transition-colors"
        >
          <svg
            className={`w-5 h-5 transition-transform ${isExpanded ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          <span className="font-medium">Filters</span>
          {hasActiveFilters && (
            <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
              Active
            </span>
          )}
          
        </button>
        
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-gray-500 hover:text-red-600 transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Filter Panel */}
      {isExpanded && (
        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
          {/* Product Name Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name
            </label>
            <input
              type="text"
              value={filters.name}
              onChange={(e) => updateFilters({ name: e.target.value })}
              placeholder="Search products..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={filters.category}
              onChange={(e) => updateFilters({ category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price Range
            </label>
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="number"
                  value={filters.minPrice}
                  onChange={(e) => updateFilters({ minPrice: e.target.value })}
                  placeholder="Min"
                  min="0"
                  max={maxPrice}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <span className="flex items-center text-gray-500">to</span>
                <input
                  type="number"
                  value={filters.maxPrice}
                  onChange={(e) => updateFilters({ maxPrice: e.target.value })}
                  placeholder="Max"
                  min="0"
                  max={maxPrice}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              
              {/* Price Range Slider */}
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max={maxPrice}
                  value={filters.maxPrice || maxPrice}
                  onChange={(e) => updateFilters({ maxPrice: e.target.value })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>$0</span>
                  <span>${filters.maxPrice || maxPrice}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 