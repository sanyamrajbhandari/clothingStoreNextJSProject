// The layout wraps EVERY page. Whatever is here (navbar, footer, cart drawer)
// shows up on the home page and the product pages without repeating code.

import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { STORE_NAME } from "@/lib/helpers";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";

// next/font downloads the fonts at build time and hosts them with our site.
// "variable" gives each font a CSS variable that globals.css picks up.
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" }); // headlines
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" }); // body text
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" }); // tiny labels

// Shows in the browser tab and in Google results.
export const metadata: Metadata = {
  title: `${STORE_NAME} | Menswear made to last`,
  description: "A demo clothing store built with Next.js and a dummy API.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${inter.variable} ${jetbrains.variable} bg-cream font-sans text-forest antialiased`}
      >
        <CartProvider>
          {/* Thin black announcement bar at the very top */}
          <div className="bg-black px-4 py-2 text-center text-xs text-white">
            Free shipping on orders over $300. Shop now and get it delivered to your doorstep.
          </div>

          <Navbar />
          <CartDrawer />

          {/* "children" = the current page (home or product) */}
          <main>{children}</main>

          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
