// A DYNAMIC route. The folder name [id] means "any value here".
// /product/5 -> params.id is "5", /product/12 -> params.id is "12".

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Star } from "lucide-react";
import { categoryLabel, getProduct } from "@/lib/api";
import { formatPrice, salePrice } from "@/lib/helpers";
import AddToCartButton from "@/components/AddToCartButton";

// In Next.js 15+, "params" arrives as a Promise, so we "await" it.
export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // If the API says "no such product", show Next.js's built-in 404 page.
  let product;
  try {
    product = await getProduct(id);
  } catch {
    notFound();
  }

  const finalPrice = salePrice(product.price, product.discountPercentage);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <Link href="/" className="flex items-center gap-2 text-sm">
        <ArrowLeft size={16} /> Back to shop
      </Link>

      <div className="mt-8 grid gap-10 md:grid-cols-2">
        {/* Photos: the first one is large, the rest sit in a small grid */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-sand">
            <Image
              src={product.images[0] ?? product.thumbnail}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              className="object-contain mix-blend-multiply"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {product.images.slice(1, 4).map((src) => (
              <div key={src} className="relative aspect-square overflow-hidden rounded-xl bg-sand">
                <Image
                  src={src}
                  alt={product.title}
                  fill
                  sizes="20vw"
                  className="object-contain mix-blend-multiply"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <p className="font-mono text-xs text-forest/60">{categoryLabel(product.category)}</p>
          <h1 className="mt-2 font-display text-4xl leading-tight">{product.title}</h1>

          <div className="mt-3 flex items-center gap-1 text-sm">
            <Star size={14} className="fill-forest" /> {product.rating.toFixed(1)}
          </div>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-3xl">{formatPrice(finalPrice)}</span>
            {/* Only show the crossed-out old price if there IS a discount */}
            {product.discountPercentage > 0 && (
              <span className="text-forest/50 line-through">{formatPrice(product.price)}</span>
            )}
          </div>

          <p className="mt-6 max-w-md leading-relaxed text-forest/80">{product.description}</p>
          <p className="mt-4 text-sm text-forest/60">{product.stock} in stock</p>

          <div className="mt-8">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
