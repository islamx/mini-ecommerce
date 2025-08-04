"use client";

import Link from "next/link";
import { Home, ArrowLeft, Package } from "lucide-react";
import Button from "@/components/forms/Button";

interface NotFoundPageProps {
  icon: "package" | "404";
  title: string;
  description: string;
  primaryButtonText: string;
  footerText: string;
}

export default function NotFoundPage({ 
  icon, 
  title, 
  description, 
  primaryButtonText, 
  footerText 
}: NotFoundPageProps) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg overflow-hidden p-8">
        <div className="text-center">
          <div className="mb-6">
            {icon === "package" ? (
              <div className="flex justify-center mb-6">
                <Package size={80} className="text-gray-400" />
              </div>
            ) : (
              <h1 className="text-8xl font-bold text-orange-600 mb-4">404</h1>
            )}
            {icon === "404" && (
              <div className="w-24 h-1 bg-orange-600 mx-auto"></div>
            )}
          </div>

          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            {title}
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/"
              className="inline-flex items-center gap-3 px-8 py-4 bg-orange-600 text-white hover:bg-orange-700 transition-colors font-semibold text-lg"
            >
              <Home size={20} />
              {primaryButtonText}
            </Link>

            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors font-semibold text-lg whitespace-nowrap"
            >
              <ArrowLeft size={20} />
              Go Back
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              {footerText}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
} 