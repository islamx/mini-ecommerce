"use client";


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
            <Button
              variant="primary"
              size="lg"
              onClick={() => window.location.href = "/"}
              className="inline-flex items-center justify-center gap-2 rounded-none px-6 py-3 text-base font-medium"
            >
              <Home size={20} />
              {primaryButtonText}
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 rounded-none px-6 py-3 text-base font-medium"
            >
              <ArrowLeft size={20} />
              Go Back
            </Button>
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