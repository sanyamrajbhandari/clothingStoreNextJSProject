import { STORE_NAME } from '@/lib/helpers'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-forest px-6 py-14 text-cream'>
        <div className='mx-auto flex  flex-col justify-between gap-8 md:flex-row'>
            {/* Brand name and tgagline */}
            <div>
                <p className='text-3xl font-display font-bold'>{STORE_NAME}</p>
                <p className='max-w-xs text-sm text-cream/80 mt-2'>Menswear built to last. This is a demo store, so nothing here is for sale.</p>
            </div>

            {/* Navlinks for pages */}
            <ul className='space-y-2 text-sm cursor-pointer text-cream/50'>
                <li><Link href="/product" className='hover:underline cursor-pointer'>Products</Link></li>
                <li><Link href="/contact" className='hover:underline'>Contact Us</Link></li>
            </ul>
        </div>

        <p className='mt-10 mx-auto max-w-6xl text-center text-xs text-cream/50'>Product data and photos from dummyjson.com</p>
    </footer>
  )
}

export default Footer