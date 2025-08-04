"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { ShoppingCart } from "lucide-react";

export default function Navbar() {
  const cartCount = useCartStore((state) =>
    state.cart.reduce((acc, item) => acc + item.quantity, 0)
  );

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left side: Logo + Home link */}
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-bold text-orange-600">
            Minierce
          </Link>
          <Link href="/" className="text-gray-700 hover:text-orange-500">
            Home
          </Link>
        </div>

        {/* Right side: Cart */}
        <div className="relative">
          <Link
            href="/cart"
            className="relative text-gray-700 hover:text-orange-500"
          >
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
