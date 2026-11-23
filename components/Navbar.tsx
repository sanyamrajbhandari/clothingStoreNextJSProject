"use client"; // needs the cart (client-side state), so it must be a client component

import Link from "next/link";
import { ShoppingBag, User } from "lucide-react";
import { useCart } from "@/lib/cart";
import { STORE_NAME } from "@/lib/helpers";

export default function Navbar() {
  const { totalItems, openCart } = useCart();

  return (
    // sticky + top-0 = the navbar stays visible while scrolling
    <header className="sticky top-0 z-30 border-b border-forest/20 bg-cream/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center px-6 py-4">
        {/* Left: links (hidden on small screens). Each one goes to its own page now. */}
        <ul className="hidden flex-1 gap-8 text-sm md:flex">
          <li><Link href="/products">Product</Link></li>
          <li><Link href="/#featured">New Arrivals</Link></li>
          <li><Link href="/contact">Contact Us</Link></li>
        </ul>

        {/* Centre: logo. The empty left/right "flex-1" blocks keep it centred */}
        <Link href="/" className="font-display text-2xl font-bold">
          {STORE_NAME}
        </Link>

        {/* Right: icons (search now lives on the Products page) */}
        <div className="flex flex-1 items-center justify-end gap-5">
          <button aria-label="Open cart" onClick={openCart} className="relative">
            <ShoppingBag size={18} />
            {/* Little badge, only shown when the cart isn't empty */}
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-forest px-1 text-[10px] text-cream">
                {totalItems}
              </span>
            )}
          </button>

          <button aria-label="Account"><User size={18} /></button>
        </div>
      </nav>
    </header>
  );
}
