import Link from "next/link";
import { ShoppingBag, Heart } from "lucide-react";

export default function CheckoutThanks() {
  return (
    <div className="text-center py-12 px-6">
      <div className="max-w-md mx-auto">
        {/* Success Icon */}
        <div className="mb-6 flex justify-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <Heart className="w-8 h-8 text-green-600" />
          </div>
        </div>

        {/* Thank You Message */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Thank You for Shopping with Us!
        </h2>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          Your order has been successfully placed. We appreciate your business and hope you love your new items!
        </p>

        {/* Call to Action */}
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            <ShoppingBag className="w-5 h-5 mr-2" />
            Continue Shopping
          </Link>
          
          <p className="text-sm text-gray-500">
            Need help? <a href="https://islamz.me" target="_blank" rel="noopener noreferrer" className="text-orange-500 underline">Contact our support team</a>
          </p>
        </div>
      </div>
    </div>
  );
} 