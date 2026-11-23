"use client";
// "use client" = this file runs in the browser (it uses useState).

// The cart has to be reachable from many places: the navbar badge, the product
// page button, the drawer. React Context lets us store it ONCE and read it
// from anywhere, without passing props through every component.

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Product } from "./api";
import { salePrice } from "./helpers";

export type CartItem = { product: Product; quantity: number };

type CartContextType = {
  items: CartItem[];
  isOpen: boolean; // is the side drawer visible?
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product) => void;
  changeQuantity: (productId: number, delta: number) => void;
  removeFromCart: (productId: number) => void;
  totalItems: number;
  subtotal: number;
};

const CartContext = createContext<CartContextType | null>(null);

// Wrap the app in this (done in app/layout.tsx) so every component can use the cart.
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addToCart = (product: Product) => {
    setItems((current) => {
      const existing = current.find((i) => i.product.id === product.id);
      if (existing) {
        // Already in the cart -> just add 1 to the quantity.
        return current.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      // New item -> add it with quantity 1.
      return [...current, { product, quantity: 1 }];
    });
  };

  // delta is +1 or -1. If the quantity drops to 0, the item disappears.
  const changeQuantity = (productId: number, delta: number) => {
    setItems((current) =>
      current
        .map((i) => (i.product.id === productId ? { ...i, quantity: i.quantity + delta } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  const removeFromCart = (productId: number) => {
    setItems((current) => current.filter((i) => i.product.id !== productId));
  };

  // Values we calculate from the items, so we never store them separately.
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce(
    (sum, i) => sum + salePrice(i.product.price, i.product.discountPercentage) * i.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        addToCart,
        changeQuantity,
        removeFromCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// A shortcut hook: const { items, addToCart } = useCart();
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
