import Image from "next/image";
import Link from "next/link";
import { categoryLabel, type Product } from "@/lib/api";
import { formatPrice, salePrice } from "@/lib/helpers";

// One product tile. We reuse it in "Featured" and "Best sellers".
// "tag" is the optional little label in the corner (e.g. "Just landed").
export default function ProductCard({ product, tag }: { product: Product; tag?: string }) {
  return (
    // The whole card is a link to /product/<id>. Next.js loads that page instantly.
    <Link href={`/product/${product.id}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-sand">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
        />
        {tag && (
          <span className="absolute left-3 top-3 rounded-full bg-cream px-2 py-1 text-[10px]">
            {tag}
          </span>
        )}
      </div>

      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] text-forest/60">{categoryLabel(product.category)}</p>
          <p className="font-display text-base font-semibold leading-snug">{product.title}</p>
        </div>
        <p className="text-sm">{formatPrice(salePrice(product.price, product.discountPercentage))}</p>
      </div>
    </Link>
  );
}
