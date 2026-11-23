"use client";

import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice, salePrice } from "@/lib/helpers";

export default function CartDrawer() {
  const { items, isOpen, closeCart, changeQuantity, removeFromCart, subtotal } = useCart();

  return (
    <>
      {/* Dark backdrop. Clicking it closes the drawer.
          We fade it in/out instead of removing it, so the animation is smooth. */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* The drawer. When closed it is pushed fully off-screen to the right. */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-cream shadow-xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-forest/20 p-5">
          <h2 className="font-display text-2xl">Your cart</h2>
          <button onClick={closeCart} aria-label="Close cart"><X size={20} /></button>
        </div>

        {/* Item list (scrolls if there are many) */}
        <div className="flex-1 space-y-5 overflow-y-auto p-5">
          {items.length === 0 && (
            <p className="text-sm text-forest/70">Your cart is empty. Add something you like.</p>
          )}

          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex gap-4">
              <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-sand">
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  fill
                  sizes="80px"
                  className="object-contain mix-blend-multiply"
                />
              </div>

              <div className="flex-1">
                <p className="font-display font-semibold leading-snug">{product.title}</p>
                <p className="text-sm">
                  {formatPrice(salePrice(product.price, product.discountPercentage))}
                </p>

                {/* - 1 + buttons */}
                <div className="mt-2 flex items-center gap-3">
                  <button
                    onClick={() => changeQuantity(product.id, -1)}
                    aria-label="Decrease quantity"
                    className="rounded-full border border-forest/40 p-1"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="text-sm">{quantity}</span>
                  <button
                    onClick={() => changeQuantity(product.id, 1)}
                    aria-label="Increase quantity"
                    className="rounded-full border border-forest/40 p-1"
                  >
                    <Plus size={12} />
                  </button>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="ml-auto text-xs underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer with the total. Checkout is a placeholder for the next stream. */}
        <div className="border-t border-forest/20 p-5">
          <div className="mb-4 flex justify-between">
            <span>Subtotal</span>
            <span className="font-semibold">{formatPrice(subtotal)}</span>
          </div>
          <button
            disabled={items.length === 0}
            className="w-full rounded-full bg-forest py-3 text-sm text-cream disabled:opacity-40"
          >
            Checkout
          </button>
        </div>
      </aside>
    </>
  );
}
