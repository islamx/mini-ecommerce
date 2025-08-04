"use client";

import { useCartStore } from "@/store/cartStore";

import Link from "next/link";
import Breadcrumb from "@/components/shared/Breadcrumb";
import Button from "@/components/forms/Button";
import CheckoutThanks from "@/components/products/CheckoutThanks";
import { useEffect } from "react";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    checkout,
    hasCheckedOut,
    resetCheckoutState,
  } = useCartStore();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Reset checkout state when component unmounts
  useEffect(() => {
    return () => {
      // Reset checkout state when leaving the page
      setTimeout(() => {
        resetCheckoutState();
      }, 100);
    };
  }, [resetCheckoutState]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Breadcrumb */}
        {!hasCheckedOut && <Breadcrumb currentPage="Cart" />}
        
        <div className="bg-white shadow-lg p-6 rounded-lg">
          {!hasCheckedOut && <h1 className="text-3xl font-bold mb-8 text-gray-800">Your Cart</h1>}

        {cart.length === 0 ? (
          hasCheckedOut ? (
            <CheckoutThanks />
          ) : (
            <p className="text-gray-600 text-center">Your cart is empty. <Link href="/" className="text-orange-500 underline">Continue Shopping</Link></p>
          )
        ) : (
          <>
            <div className="space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="flex items-start gap-4 sm:gap-6 border-b pb-6">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="object-cover rounded w-full h-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h2 className="font-semibold text-gray-800 text-sm sm:text-base truncate">{item.title}</h2>
                        <p className="text-gray-600 text-sm sm:text-base">{item.price.toLocaleString()} €</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-500 hover:text-red-600 text-lg font-bold transition-colors duration-200 px-2 py-1 rounded hover:bg-gray-100 flex-shrink-0"
                        title="Remove item"
                      >
                        ×
                      </button>
                    </div>
                    <div className="flex items-center mt-2 gap-3">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        -
                      </Button>
                      <span className="font-semibold">{item.quantity}</span>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => increaseQuantity(item.id)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

                        <div className="mt-10 flex justify-between items-end">
              <div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={clearCart}
                  className="bg-gray-100 text-gray-600 hover:bg-gray-200"
                >
                  Clear Cart
                </Button>
              </div>

              <div className="text-right">
                <p className="text-xl font-bold">
                  Total: {total.toLocaleString()} €
                </p>
                <Button 
                  variant="primary"
                  size="md"
                  className="mt-3"
                  onClick={checkout}
                >
                  Checkout
                </Button>
              </div>
            </div>
           </>
         )}
         </div>
       </div>
     </main>
   );
 }
