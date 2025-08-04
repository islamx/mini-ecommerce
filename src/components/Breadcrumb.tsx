"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbProps {
  currentPage: string;
}

export default function Breadcrumb({ currentPage }: BreadcrumbProps) {
  return (
    <div className="mb-6">
      <nav className="flex items-center gap-3 text-base font-medium">
        <Link 
          href="/" 
          className="text-orange-600 hover:text-orange-700 transition-colors duration-200 underline decoration-1 underline-offset-2"
        >
          Products
        </Link>
        <ChevronRight size={18} className="text-gray-400" />
        <span className="text-gray-800">{currentPage}</span>
      </nav>
    </div>
  );
} 