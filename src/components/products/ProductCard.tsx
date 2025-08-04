"use client";

import Link from "next/link";
import { useHandleAddToCart } from "@/lib/cartUtils";
import Button from "../forms/Button";

type Props = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  index?: number;
};

function truncate(text: string, maxLength: number) {
  return text.length > maxLength ? text.slice(0, maxLength - 1) + "…" : text;
}

function ProductCard({ id, title, description, imageUrl, price, index = 0 }: Props) {
  const originalPrice = price;
  const discountedPrice = Math.round(price * 0.7);
  const isEven = index % 2 === 0;
  const cardBgClass = isEven ? "bg-gray-100" : "bg-gray-50";

  const handleAddToCart = useHandleAddToCart();

  return (
    <div className={`${cardBgClass} p-4 flex flex-col h-full hover:bg-gray-200 transition-colors duration-200`}>
      <Link href={`/product/${id}`}>
        <div className="relative w-full h-48 mb-4 bg-white overflow-hidden flex items-center justify-center">
          <img
            src={imageUrl}
            alt={title}
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </div>

        <div className="mx-auto max-w-xs sm:max-w-sm md:max-w-md text-center">
          <h3 className="text-sm font-semibold text-gray-600 mb-1 truncate">
            <span title={title}>{truncate(title, 40)}</span>
          </h3>

          <p className="text-base text-gray-800 mb-2 line-clamp-2 min-h-[48px] ">
            <span title={description}>{truncate(description, 100)}</span>
          </p>
        </div>

        <div className="mb-4 flex items-center justify-center gap-2">
          <span className="text-gray-400 line-through text-sm">
            {originalPrice.toLocaleString()} €
          </span>
          <span className="text-xl font-bold text-gray-800">
            {discountedPrice.toLocaleString()} €
          </span>
        </div>
      </Link>

      <Button
        variant="primary"
        size="lg"
        onClick={() => handleAddToCart({ id, title, price, imageUrl })}
        className="mt-auto w-full"
      >
        ADD TO CART
      </Button>
    </div>
  );
}

export default ProductCard;
