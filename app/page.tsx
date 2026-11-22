import FeaturedSection from "@/components/FeaturedSection";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import { getAllProducts } from "@/lib/api";

export default async function HomePage() {
  const products = await getAllProducts();
  const shirts = products.filter((p) => p.category === "mens-shirts");

  // Hero slides: The frist 3 shirts, each with a hashtag

  const tags = ["#outfitofthedaty", "#newseason", "#weekendwear"];
  const featured = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);
  const slides = shirts.slice(0, 3).map((p, i) => ({
    id: p.id,
    image: p.thumbnail,
    title: p.title,
    tag: tags[i],
  }));
  return (
    <div>
      <Hero slides={slides} />

      <Marquee />

      <FeaturedSection featured={featured} />
      {/* Feature section */}
      
    </div>
  );
}
