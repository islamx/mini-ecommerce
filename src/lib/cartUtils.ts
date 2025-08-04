import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";

export function useHandleAddToCart() {
  const addToCart = useCartStore((state) => state.addToCart);

  return function (product: {
    id: number;
    title: string;
    price: number;
    imageUrl: string;
  }) {
    addToCart(product);
    toast.success(`${product.title} تمت إضافته للسلة`);
  };
}
