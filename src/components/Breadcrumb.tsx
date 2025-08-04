"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbProps {
  currentPage: string;
  isAdmin?: boolean;
}

export default function Breadcrumb({ currentPage, isAdmin = false }: BreadcrumbProps) {
  return (
    <div className="mb-6">
      <nav className="flex items-center gap-3 text-base font-medium">
        <Link 
          href={isAdmin ? "/admin" : "/"} 
          className="text-orange-600 hover:text-orange-700 transition-colors duration-200"
        >
          {isAdmin ? "Admin" : "Products"}
        </Link>
        <ChevronRight size={18} className="text-gray-400" />
        <span className="text-gray-800">{currentPage}</span>
      </nav>
    </div>
  );
} 