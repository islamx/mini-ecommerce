"use client";

import InputField from "../forms/InputField";

interface ProductFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function ProductFilter({ search, onSearchChange }: ProductFilterProps) {
  return (
    <div className="mb-6 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-100 shadow-sm">
      <InputField
        label=""
        type="text"
        placeholder="Search by title..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="bg-white border-orange-200 focus:border-orange-400 focus:ring-orange-400"
      />
      {search && (
        <p className="mt-2 text-xs text-gray-500">
          Showing results for: <span className="font-medium text-orange-600">&quot;{search}&quot;</span>
        </p>
      )}
    </div>
  );
} 