import React from 'react'
import Link from "next/link"
import { STORE_NAME } from '@/lib/helpers'
import {ShoppingBag, User} from "lucide-react"
const Navbar = () => {
  return (
    <header className='sticky top-0 z-30 border-b border-forest/20 bg-cream backdrop:-blur text-forest'>
        <nav className='mx-auto max-w-6xl flex  items-center justify-between px-6 py-4'>
            <ul className=' gap-8 hidden text-sm sm:flex'>
                <li className='/products'> Product</li>
                <li>New Arrivals</li>
                <li><Link href="/contact">Contact Us</Link></li>
            </ul>

            <Link href="/" className='font-display text-2xl font-bold'>{STORE_NAME}</Link>

            
        {/* Icons */}
        <div className='flex justify-end gap-5 items-center'>
            <button><ShoppingBag size={18}/></button>
            <button><User size={18} /></button>
        </div>
        </nav>


        
    </header>
  )
}

export default Navbar