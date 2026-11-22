"use client"; //hero component becomes a client component -->  canuse states (useState)

import Image from "next/image";
import React from "react";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

export type Slide = {
  id: number;
  image: string;
  tag: string;
  title: string;
};
export default function Hero({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);

  // Functions that make the slider work
  const next = () => setIndex((i) => (i + 1) % slides.length);

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);

  const slide = slides[index];
  return (
    <section className="max-w-6xl px-6 pt-12 mx-auto">
      <h1 className="font-display text-5xl text-forest leading-[1.05] tracking-tight md:text-7xl">
        Dressed for the long game
        <span className="mt-2 block text-4xl md:ml-auto md:max-w-xl  md:text-6xl">
          Your Style. Our canvas.
        </span>
      </h1>

      <p className="mt-6 max-w-xs text-sm leading-relaxed text-forest/80">
        Considered menswear built to last. No logos, no seasons to chase. Only
        pieces that outlast the trend cycle.
      </p>

      {/* The slider card */}
      <div className="relative mt-10 h-[420px] overflow-hidden bg-sand rounded-s-3xl ">
        <Image
          key={slide.image}
          src={slide.image}
          alt={slide.title}
          fill //fill the parent box --> we also have to use the  relative property on our parent
          sizes="(max-width:1152px) 100vw, 1152px"
          priority
          className="object-contain mix-blend-multiply"
        />

        {/* Dark green fade */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-forest/80 to-transparent">
          {/* Caption and button */}
          <div className="flex justify-between items-end absolute inset-x-0 bottom-0 p-6 text-cream">
            <div>
              <p className="text-xs">{slide.tag}</p>
              <p className="text-3xl font-display mt-1 max-w-xs leading-tight">
                {slide.title}
              </p>
            </div>

            <Link
              href={`/product/${slide.id}`}
              className="flex items-center gap-1 border border-cream/70 px-4 py-2 rounded-full text-xs hover:bg-cream hover:text-forest"
            >
              Shop now <ArrowUpRight size={14} />
            </Link>
          </div>

          {/* Arrow buttons to change products on slider */}
          <button
            className="absolute flex justify-center items-center  left-4 -top-2/5 2 h-10 w-10 bg-white rounded-full shadow -translate-y-1/2 "

            onClick={prev}
          >
                <ArrowLeft size={18} />
          </button>

          <button
          
          className="absolute flex justify-center items-center  right-4 h-10 w-10 bg-white rounded-full shadow -translate-y-1/2 -top-2/5 "
          
          onClick={next}>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
