// All the data fetching lives in this ONE file.
// Components never call fetch() themselves, they call these functions.
// That makes it easy to swap the dummy API for a real backend later.

// DummyJSON = a free fake store API. No account, no API key.
// Docs: https://dummyjson.com/docs/products
const BASE_URL = "https://dummyjson.com";

// The shape of a product. TypeScript uses this to autocomplete fields
// and warn us if we mistype one (e.g. product.titel).
export type Product = {
  id: number;
  title: string;
  description: string;
  category: string; // the API "slug", e.g. "mens-shirts"
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand?: string;
  thumbnail: string; // small main photo
  images: string[]; // extra photos
};

// Our shop categories mapped to DummyJSON category slugs.
// "label" is what shoppers see, "slug" is what the API understands.
export const CATEGORIES = [
  { label: "Shirts", slug: "mens-shirts" },
  { label: "Footwear", slug: "mens-shoes" },
  { label: "Watches", slug: "mens-watches" },
  { label: "Eyewear", slug: "sunglasses" },
];

// Turn "mens-shirts" into "Shirts" for display.
export function categoryLabel(slug: string): string {
  return CATEGORIES.find((c) => c.slug === slug)?.label ?? slug;
}

// A tiny wrapper around fetch so we don't repeat ourselves.
// "revalidate: 3600" is a Next.js feature: it caches the response for an hour,
// so we don't hit the API on every single page visit.
async function getJSON<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`API request failed: ${res.status}`);
  return res.json();
}

// All products inside one category.
export async function getProductsByCategory(slug: string): Promise<Product[]> {
  const data = await getJSON<{ products: Product[] }>(`/products/category/${slug}`);
  return data.products;
}

// Products from ALL our categories, merged into one list.
// Promise.all runs the 4 requests at the same time instead of one by one.
export async function getAllProducts(): Promise<Product[]> {
  const lists = await Promise.all(CATEGORIES.map((c) => getProductsByCategory(c.slug)));
  return lists.flat();
}

// One product by id (used on the product detail page).
export async function getProduct(id: string): Promise<Product> {
  return getJSON<Product>(`/products/${id}`);
}
