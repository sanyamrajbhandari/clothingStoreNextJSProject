// The PRODUCTS page (the "/products" route): category filter + search + pagination.
//
// Big idea: the filters live in the URL, not in useState.
//   /products?category=mens-shoes&q=suede&page=2
// So this stays a simple server component, and every filtered view can be
// bookmarked, shared, and works with the browser's back button.

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import { CATEGORIES, categoryLabel, getAllProducts } from "@/lib/api";
import { STORE_NAME } from "@/lib/helpers";
import ProductCard from "@/components/ProductCard";

export const metadata: Metadata = { title: `All products | ${STORE_NAME}` };

const PER_PAGE = 8; // products per page. Change it and pagination adapts.

// Next.js 15+ gives us the URL's query string as a Promise.
type SearchParams = Promise<{ category?: string; q?: string; page?: string }>;

// Builds a link like "/products?category=mens-shoes&page=2".
// We leave out values that are just the defaults so URLs stay clean.
function buildUrl(opts: { category?: string; q?: string; page?: number }) {
  const params = new URLSearchParams();
  if (opts.category && opts.category !== "all") params.set("category", opts.category);
  if (opts.q) params.set("q", opts.q);
  if (opts.page && opts.page > 1) params.set("page", String(opts.page));
  const qs = params.toString();
  return qs ? `/products?${qs}` : "/products";
}

export default async function ProductsPage({ searchParams }: { searchParams: SearchParams }) {
  // 1. Read the filters from the URL (with defaults if they're missing).
  const { category = "all", q = "", page = "1" } = await searchParams;
  const search = q.trim();

  // 2. Get all products, then filter them down.
  const allProducts = await getAllProducts();

  const filtered = allProducts.filter((p) => {
    // Does it match the selected category? ("all" matches everything)
    const matchesCategory = category === "all" || p.category === category;

    // Does the search text appear in the title, brand or category name?
    // toLowerCase() on both sides makes the search ignore capital letters.
    const searchable = `${p.title} ${p.brand ?? ""} ${categoryLabel(p.category)}`.toLowerCase();
    const matchesSearch = search === "" || searchable.includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // 3. Pagination maths.
  // 22 products / 8 per page = 2.75 -> Math.ceil rounds UP to 3 pages.
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  // Keep the page number valid even if someone types ?page=999 in the URL.
  const currentPage = Math.min(Math.max(1, Number(page) || 1), totalPages);
  const start = (currentPage - 1) * PER_PAGE;
  const pageItems = filtered.slice(start, start + PER_PAGE); // only this page's products

  const tabs = [{ label: "All", slug: "all" }, ...CATEGORIES];

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="font-display text-5xl">All products</h1>
      <p className="mt-2 text-sm text-forest/70">
        {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
        {search && <> matching &ldquo;{search}&rdquo;</>}
      </p>

      {/* ---- Search + category tabs ---- */}
      <div className="mt-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        {/* A plain HTML form. Pressing Enter sends the browser to /products?q=...
            No JavaScript needed, so this page stays a server component. */}
        <form action="/products" className="relative w-full md:max-w-sm">
          {/* Hidden field keeps the chosen category when searching */}
          {category !== "all" && <input type="hidden" name="category" value={category} />}
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-forest/60" />
          <input
            type="search"
            name="q"
            defaultValue={search}
            placeholder="Search shirts, shoes, watches..."
            className="w-full rounded-full border border-forest/30 bg-transparent py-3 pl-11 pr-4 text-sm outline-none focus:border-forest"
          />
        </form>

        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <Link
              key={tab.slug}
              // Switching category keeps the search text but goes back to page 1
              href={buildUrl({ category: tab.slug, q: search })}
              className={`rounded-full border border-forest/40 px-4 py-1 text-xs ${
                category === tab.slug ? "bg-forest text-cream" : "hover:bg-forest/10"
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </div>

      {/* ---- Product grid (or an empty state) ---- */}
      {pageItems.length === 0 ? (
        <div className="mt-16 text-center">
          <p className="font-display text-2xl">Nothing matches that search.</p>
          <p className="mt-2 text-sm text-forest/70">Try a shorter word or pick another category.</p>
          <Link href="/products" className="mt-6 inline-block rounded-full bg-forest px-5 py-3 text-sm text-cream">
            Clear filters
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-4">
          {pageItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* ---- Pagination (only shown if there's more than one page) ---- */}
      {totalPages > 1 && (
        <nav aria-label="Pagination" className="mt-14 flex items-center justify-center gap-2">
          {/* Previous: a real link, or a faded span on page 1 */}
          {currentPage > 1 ? (
            <Link
              href={buildUrl({ category, q: search, page: currentPage - 1 })}
              aria-label="Previous page"
              className="rounded-full border border-forest/40 p-2 hover:bg-forest/10"
            >
              <ArrowLeft size={16} />
            </Link>
          ) : (
            <span className="rounded-full border border-forest/20 p-2 opacity-30"><ArrowLeft size={16} /></span>
          )}

          {/* Numbered buttons: Array.from makes [1, 2, 3, ...] */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <Link
              key={n}
              href={buildUrl({ category, q: search, page: n })}
              className={`flex h-9 w-9 items-center justify-center rounded-full border border-forest/40 text-sm ${
                n === currentPage ? "bg-forest text-cream" : "hover:bg-forest/10"
              }`}
            >
              {n}
            </Link>
          ))}

          {currentPage < totalPages ? (
            <Link
              href={buildUrl({ category, q: search, page: currentPage + 1 })}
              aria-label="Next page"
              className="rounded-full border border-forest/40 p-2 hover:bg-forest/10"
            >
              <ArrowRight size={16} />
            </Link>
          ) : (
            <span className="rounded-full border border-forest/20 p-2 opacity-30"><ArrowRight size={16} /></span>
          )}
        </nav>
      )}
    </div>
  );
}
