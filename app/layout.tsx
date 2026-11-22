import "./globals.css"
import {Fraunces, Inter, JetBrains_Mono} from "next/font/google"
import {STORE_NAME} from "@/lib/helpers"
import type {Metadata} from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


const fraunces = Fraunces({subsets:['latin'],variable:"--font-fraunces"})

const inter = Inter({subsets:['latin'],variable:"--font-inter"})

const jetbrains = JetBrains_Mono({subsets:['latin'],variable:"--font-jetbrains"})

//shows up in google search results

export const metadata: Metadata ={
  title: `${STORE_NAME} | Menswear meant to last`,
  description: `A demo clothing store built with Next.js and a dummy API`
}

export default function RootLayout({children} : {children: React.ReactNode}){
  return(<html lang="en">
    <body
    className={`${fraunces.variable} ${inter.variable} ${jetbrains.variable} bg-cream font-sans text- antialiased`}
    >
      <Navbar />
      {children}
      <Footer />
    </body>

    {/* Footer */}

    
  </html>)
  
}