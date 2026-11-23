"use client"; // the filter buttons change what's on screen, so we need useState

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CATEGORIES, type Product } from "@/lib/api";
import ProductCard from "./ProductCard";

export default function BestSellers({ products }: { products: Product[] }) {
  // "all" or one of the category slugs
  const [active, setActive] = useState("all");

  // Show everything, or only the products in the chosen category.
  // Then .slice(0, 8) keeps the grid to a neat 8 items.
  const visible = products
    .filter((p) => active === "all" || p.category === active)
    .slice(0, 8);

  // The buttons: "All" plus one per category.
  const tabs = [{ label: "All", slug: "all" }, ...CATEGORIES];

  return (
    <section id="best-sellers" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-display text-4xl">Best sellers</h2>

        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.slug}
              onClick={() => setActive(tab.slug)}
              // The active tab is filled green, the others are outlined
              className={`rounded-full border border-forest/40 px-4 py-1 text-xs ${
                active === tab.slug ? "bg-forest text-cream" : "hover:bg-forest/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-4">
        {visible.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Sends shoppers to the full catalogue. If a tab is selected, we carry that
          category over, so "Footwear" here opens /products?category=mens-shoes */}
      <div className="mt-10 flex justify-center">
        <Link
          href={active === "all" ? "/products" : `/products?category=${active}`}
          className="flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm text-cream hover:bg-forest/90"
        >
          View all products <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
