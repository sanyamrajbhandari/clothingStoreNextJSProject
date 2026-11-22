import { Product } from '@/lib/api'
import React from 'react'
import ProductCard from './ProductCard'

function FeaturedSection({featured}:{featured:Product[]}) {
  return (
    <section id='featured' className='mx-auto max-w-6xl scroll-mt-20 px-6 py-20'>
        
        <div className='flex flex-wrap items-end justify-between gap-4'>
            <h2 className='font-display text-4xl text-forest'>Featured this week</h2>
            <p className='max-w-xs text-sm text-forest/70'>Three pieces we keep reaching for. Limited runs, restocked rarely.</p>
        </div>

        {/* Cards that are featured */}
        <div className='mt-10 grid grid-cols-1 gap-6 md:grid-cols-3'>

            {featured.map((product,i)=>(
                <div key={product.id} className={i ===1 ? "md:-translate-y-6":""}>
                    <ProductCard  product={product} key={i} tag='Hot drop'/>
                </div>
            ))}
        </div>
    </section>

    
  )
}

export default FeaturedSection