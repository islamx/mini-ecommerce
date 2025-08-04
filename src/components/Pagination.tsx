"use client";

import Link from "next/link";

type Props = {
  currentPage: number;
  totalPages: number;
  baseUrl?: string; 
};

export default function Pagination({ currentPage, totalPages, baseUrl = "/" }: Props) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const sharedBtnStyles =
    "px-4 py-2 rounded font-medium text-sm transition-all duration-200";

  return (
    <div className="flex justify-center items-center gap-2 mt-12 flex-wrap">
      {/* Prev Button */}
      {currentPage > 1 ? (
        <Link
          href={`${baseUrl}?page=${currentPage - 1}`}
          className={`${sharedBtnStyles} bg-[#F4D8B4] text-gray-800 hover:bg-[#E8C8A0]`}
        >
          ← Prev
        </Link>
      ) : (
        <span
          className={`${sharedBtnStyles} bg-gray-100 text-gray-400 cursor-not-allowed`}
        >
          ← Prev
        </span>
      )}

      {/* Page Numbers */}
      {pages.map((page) => (
        <Link
          key={page}
          href={`${baseUrl}?page=${page}`}
          className={`px-4 py-2 rounded font-semibold text-sm border transition-all duration-200 ${
            page === currentPage
              ? "bg-gray-800 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          {page}
        </Link>
      ))}

      {/* Next Button */}
      {currentPage < totalPages ? (
        <Link
          href={`${baseUrl}?page=${currentPage + 1}`}
          className={`${sharedBtnStyles} bg-[#F4D8B4] text-gray-800 hover:bg-[#E8C8A0]`}
        >
          Next →
        </Link>
      ) : (
        <span
          className={`${sharedBtnStyles} bg-gray-100 text-gray-400 cursor-not-allowed`}
        >
          Next →
        </span>
      )}
    </div>
  );
}
