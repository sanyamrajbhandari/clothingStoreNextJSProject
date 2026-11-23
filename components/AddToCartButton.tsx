"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/api";

// The product page itself is a server component (it fetches data),
// so the one interactive piece, this button, lives in its own client component.
export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart, openCart } = useCart();

  return (
    <button
      onClick={() => {
        addToCart(product); // 1. put it in the cart
        openCart(); // 2. slide the drawer open so the shopper sees it worked
      }}
      className="flex w-full items-center justify-center gap-2 rounded-full bg-forest px-6 py-4 text-sm text-cream hover:bg-forest/90 md:w-auto"
    >
      <ShoppingBag size={16} /> Add to cart
    </button>
  );
}
