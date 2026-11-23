import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // next/image only loads images from hosts we explicitly allow.
    // DummyJSON hosts all of its product photos on this domain.
    // If you add Unsplash photos later, add { protocol: "https", hostname: "images.unsplash.com" }.
    remotePatterns: [{ protocol: "https", hostname: "cdn.dummyjson.com" }],
  },
};

export default nextConfig;
