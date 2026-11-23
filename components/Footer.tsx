import Link from "next/link";
import { STORE_NAME } from "@/lib/helpers";

export default function Footer() {
  return (
    <footer className="bg-forest px-6 py-14 text-cream">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-8 md:flex-row">
        <div>
          <p className="font-display text-3xl font-bold">{STORE_NAME}</p>
          <p className="mt-2 max-w-xs text-sm text-cream/70">
            Menswear built to last. This is a demo store, so nothing here is for sale.
          </p>
        </div>
        <ul className="space-y-2 text-sm text-cream/80">
          <li><Link href="/products" className="hover:underline">All products</Link></li>
          <li><Link href="/contact" className="hover:underline">Contact us</Link></li>
        </ul>
      </div>
      <p className="mx-auto mt-10 max-w-6xl text-xs text-cream/50">
        Product data and photos from dummyjson.com
      </p>
    </footer>
  );
}
