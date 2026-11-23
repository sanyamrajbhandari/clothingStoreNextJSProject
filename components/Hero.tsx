"use client"; // the slider remembers which slide is showing (useState), so it runs in the browser

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

export type Slide = { id: number; image: string; tag: string; title: string };

export default function Hero({ slides }: { slides: Slide[] }) {
  // "index" = which slide we're on. Starts at 0 (the first one).
  const [index, setIndex] = useState(0);

  // The % trick makes the slider wrap around: after the last slide comes the first.
  const next = () => setIndex((i) => (i + 1) % slides.length);
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);

  const slide = slides[index];

  return (
    <section className="mx-auto max-w-6xl px-6 pt-12">
      {/* Big headline. The second line is pushed right to copy the reference design */}
      <h1 className="font-display text-5xl leading-[1.05] tracking-tight md:text-7xl">
        Dressed for the long game.
        <span className="mt-2 block text-4xl md:ml-auto md:max-w-xl md:text-6xl">
          Your style. Our canvas.
        </span>
      </h1>
      <p className="mt-6 max-w-xs text-sm leading-relaxed text-forest/80">
        Considered menswear built to last. No logos, no seasons to chase. Only pieces that
        outlast the trend cycle.
      </p>

      {/* The slider card */}
      <div className="relative mt-10 h-[420px] overflow-hidden rounded-3xl bg-sand">
        <Image
          key={slide.image} // a new key makes React swap the image cleanly
          src={slide.image}
          alt={slide.title}
          fill // fill the parent box (the parent needs "relative", which it has)
          sizes="(max-width: 1152px) 100vw, 1152px"
          priority // this is the first thing people see, so load it first
          // object-contain keeps the whole product visible.
          // mix-blend-multiply makes the photo's white background blend into the beige card.
          className="object-contain mix-blend-multiply"
        />

        {/* Dark fade at the bottom so the white text is readable */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-forest/80 to-transparent" />

        {/* Caption + button */}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-cream">
          <div>
            <p className="text-xs">{slide.tag}</p>
            <p className="mt-1 max-w-xs font-display text-3xl leading-tight">{slide.title}</p>
          </div>
          <Link
            href={`/product/${slide.id}`}
            className="flex items-center gap-1 rounded-full border border-cream/70 px-4 py-2 text-xs hover:bg-cream hover:text-forest"
          >
            Shop now <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Arrow buttons */}
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow"
        >
          <ArrowLeft size={18} />
        </button>
        <button
          onClick={next}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow"
        >
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}
