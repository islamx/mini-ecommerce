"use client";

import Image from "next/image";
import Link from "next/link";

type Props = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  index?: number; // To determine odd/even styling
};

function ProductCard({ id, title, description, imageUrl, price, index = 0 }: Props) {
  // Calculate discounted price (30% discount for demo)
  const originalPrice = price;
  const discountedPrice = Math.round(price * 0.7);

  // Determine background color based on odd/even index
  const isEven = index % 2 === 0;
  const cardBgClass = isEven ? "bg-gray-100" : "bg-gray-50";

  return (
    <Link
      href={`/product/${id}`}
      className={`block ${cardBgClass} p-4 flex flex-col h-full hover:bg-gray-200 transition-colors duration-200`}
    >
      {/* Product Image */}
      <div className="relative w-full h-48 mb-4 bg-white overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
          loading="lazy"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col gap-3 flex-grow text-center">
        <h3 className="text-sm font-semibold text-gray-600 mb-1">{title}</h3>
        <p className="text-base text-gray-800 mb-2 line-clamp-2">{description}</p>

        {/* Pricing */}
        <div className="mb-4">
          <div className="flex items-center justify-center gap-2">
            <span className="text-gray-400 line-through text-sm">
              {originalPrice.toLocaleString()} €
            </span>
            <span className="text-xl font-bold text-gray-800">
              {discountedPrice.toLocaleString()} €
            </span>
          </div>
        </div>

        {/* Add to Cart Button */}
        <div className="mt-auto bg-[#F4D8B4] hover:bg-[#E8C8A0] text-gray-800 font-semibold py-3 px-6 text-center">
          ADD TO CART
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
