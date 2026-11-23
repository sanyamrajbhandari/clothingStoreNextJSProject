// The HOME PAGE (the "/" route).
// This is a SERVER component: it can be "async" and fetch data directly.
// No useEffect, no loading state. Next.js waits for the data, then sends ready HTML.

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CATEGORIES, getAllProducts } from "@/lib/api";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import ProductCard from "@/components/ProductCard";
import BestSellers from "@/components/BestSellers";

export default async function HomePage() {
  // 1. Get the data. Everything below is built from this one list.
  const products = await getAllProducts();

  // 2. Shape the data for each section.
  const shirts = products.filter((p) => p.category === "mens-shirts");

  // Hero slides: the first 3 shirts, each with a hashtag caption.
  const tags = ["#outfitoftheday", "#newseason", "#weekendwear"];
  const slides = shirts.slice(0, 3).map((p, i) => ({
    id: p.id,
    image: p.thumbnail,
    title: p.title,
    tag: tags[i],
  }));

  // Featured: the 3 best-rated products. [...products] makes a copy so
  // sorting doesn't change the original list.
  const featured = [...products].sort((a, b) => b.rating - a.rating).slice(0, 3);
  const featuredTags = ["The signature", "Just landed", "Editor's pick"];

  // Category cards: use the first product of each category as its cover photo.
  const categoryCards = CATEGORIES.map((c) => {
    const inCategory = products.filter((p) => p.category === c.slug);
    return { ...c, cover: inCategory[0]?.thumbnail, count: inCategory.length };
  });

  const promoProduct = shirts[3] ?? shirts[0];

  return (
    <>
      {/* ---- Hero + scrolling strip ---- */}
      <Hero slides={slides} />
      <Marquee />

      {/* ---- Featured this week ---- */}
      <section id="featured" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-4xl">Featured this week</h2>
          <p className="max-w-xs text-sm text-forest/70">
            Three pieces we keep reaching for. Limited runs, restocked rarely.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {featured.map((product, i) => (
            // The middle card sits a little higher (md:-translate-y-6), like the reference
            <div key={product.id} className={i === 1 ? "md:-translate-y-6" : ""}>
              <ProductCard product={product} tag={featuredTags[i]} />
            </div>
          ))}
        </div>
      </section>

      {/* ---- Shop by category (dark green section) ---- */}
      <section className="bg-forest py-16 text-cream">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-4xl">
            Shop by <em className="text-lime">category</em>
          </h2>

          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {categoryCards.map((c) => (
              <Link
                key={c.slug}
                href={`/products?category=${c.slug}`}
                className="relative block aspect-[3/4] overflow-hidden rounded-2xl bg-sand"
              >
                {c.cover && (
                  <Image
                    src={c.cover}
                    alt={c.label}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-contain mix-blend-multiply"
                  />
                )}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest/90 to-transparent p-4 pt-12">
                  <p className="font-display text-lg">{c.label}</p>
                  <p className="font-mono text-[10px] text-cream/70">{c.count} pieces</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Promo banner ---- */}
      <section className="bg-sand py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 md:grid-cols-2">
          <div>
            <p className="font-mono text-[11px] text-forest/60">Limited window</p>
            <h2 className="mt-2 font-display text-5xl leading-tight">
              Winter sale <em className="text-forest/80">up to 30% off</em>
            </h2>
            <p className="mt-4 max-w-sm text-sm text-forest/80">
              Shirts, shoes and watches, reduced for two weeks only. Free alterations on every
              order.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <Link
                href="/products"
                className="flex items-center gap-1 rounded-full bg-forest px-5 py-3 text-sm text-cream"
              >
                Shop the sale <ArrowUpRight size={14} />
              </Link>
              <span className="font-mono text-xs">Ends in 6d 14h 22m</span>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-cream">
              {promoProduct && (
                <Image
                  src={promoProduct.thumbnail}
                  alt={promoProduct.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain mix-blend-multiply"
                />
              )}
            </div>
            {/* The floating "30%" card from the reference */}
            <div className="absolute -bottom-5 left-4 rounded-xl border border-forest/30 bg-cream p-4 shadow-sm">
              <p className="font-display text-3xl font-bold">30%</p>
              <p className="font-mono text-[10px]">off selected pieces</p>
              <div className="mt-2 h-1.5 w-32 rounded-full bg-forest/15">
                <div className="h-full w-3/5 rounded-full bg-lime" />
              </div>
              <p className="mt-1 font-mono text-[10px] text-forest/60">60% claimed</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Best sellers (client component with filter tabs) ---- */}
      <BestSellers products={products} />
    </>
  );
}
