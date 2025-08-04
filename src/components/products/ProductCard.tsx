"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";
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

function ProductCard({ id, title, description, imageUrl, price, index = 0 }: Props) {
  const originalPrice = price;
  const discountedPrice = Math.round(price * 0.7);
  const isEven = index % 2 === 0;
  const cardBgClass = isEven ? "bg-gray-100" : "bg-gray-50";

  const handleAddToCart = useHandleAddToCart();


  return (
    <div className={`${cardBgClass} p-4 flex flex-col h-full hover:bg-gray-200 transition-colors duration-200`}>
      <Link href={`/product/${id}`}>
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
        <h3 className="text-sm font-semibold text-gray-600 mb-1 text-center">{title}</h3>
      </Link>

      <p className="text-base text-gray-800 mb-2 line-clamp-2 text-center">{description}</p>

      <div className="mb-4 flex items-center justify-center gap-2">
        <span className="text-gray-400 line-through text-sm">
          {originalPrice.toLocaleString()} €
        </span>
        <span className="text-xl font-bold text-gray-800">
          {discountedPrice.toLocaleString()} €
        </span>
      </div>


      <Button
        onClick={() => handleAddToCart({ id, title, price, imageUrl })}
        className="mt-auto bg-[#F4D8B4] hover:bg-[#E8C8A0] text-gray-800 font-semibold py-3 px-6 text-center"

      >
        ADD TO CART
      </Button>
    </div>
  );
}

export default ProductCard;
