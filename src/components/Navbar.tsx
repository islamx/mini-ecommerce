"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { ShoppingCart, Package, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartCount = useCartStore((state) =>
    state.cart.reduce((acc, item) => acc + item.quantity, 0)
  );

  const toggleMobileMenu = () => {
    console.log('Toggle mobile menu, current state:', isMobileMenuOpen);
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side: Logo + Desktop Navigation */}
          <div className="flex items-center gap-8">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-2xl font-bold text-orange-600 hover:text-orange-700 transition-colors duration-200"
            >
              <Package size={28} className="text-orange-500" />
              Minierce
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-orange-500 font-medium transition-colors duration-200 px-3 py-2 rounded-md hover:bg-orange-50"
              >
                Products
              </Link>
              <Link 
                href="/admin" 
                className="text-gray-600 hover:text-orange-500 font-medium transition-colors duration-200 px-3 py-2 rounded-md hover:bg-orange-50"
              >
                Admin
              </Link>
            </nav>
          </div>

          {/* Right side: Cart + Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <Link
              href="/cart"
              className="relative flex items-center gap-2 text-gray-700 hover:text-orange-500 transition-colors duration-200 p-2 rounded-md hover:bg-orange-50"
            >
              <ShoppingCart size={24} />
              <span className="hidden sm:inline text-sm font-medium">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[20px] flex items-center justify-center shadow-md">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-gray-700 hover:text-orange-500 transition-colors duration-200"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 bg-white">
            <nav className="flex flex-col gap-2 pt-4">
              <Link 
                href="/" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-700 hover:text-orange-500 font-medium transition-colors duration-200 px-3 py-2 rounded-md hover:bg-orange-50"
              >
                Products
              </Link>
              <Link 
                href="/admin" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-600 hover:text-orange-500 font-medium transition-colors duration-200 px-3 py-2 rounded-md hover:bg-orange-50"
              >
                Admin
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
