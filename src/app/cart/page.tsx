"use client";

import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCartStore();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Your Cart</h1>

        {cart.length === 0 ? (
          <p className="text-gray-600 text-center">Your cart is empty. <Link href="/" className="text-orange-500 underline">Continue Shopping</Link></p>
        ) : (
          <>
            <div className="space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-6 border-b pb-6">
                  <div className="relative w-24 h-24">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-semibold text-gray-800">{item.title}</h2>
                    <p className="text-gray-600">{item.price.toLocaleString()} €</p>
                    <div className="flex items-center mt-2 gap-3">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="px-3 py-1 bg-gray-200"
                      >
                        -
                      </button>
                      <span className="font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="px-3 py-1 bg-gray-200"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 ml-4"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex justify-between items-center">
              <div>
                <button
                  onClick={clearCart}
                  className="text-sm text-red-600 underline"
                >
                  Clear Cart
                </button>
              </div>

              <div className="text-right">
                <p className="text-xl font-bold">
                  Total: {total.toLocaleString()} €
                </p>
                <button className="mt-3 bg-orange-400 hover:bg-orange-500 text-white px-6 py-2 rounded">
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
