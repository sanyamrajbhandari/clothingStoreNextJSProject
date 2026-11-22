import { categoryLabel, Product } from '@/lib/api'
import { formatPrice, salePrice } from '@/lib/helpers';
import Image from 'next/image';
import Link from 'next/link'
import React from 'react'

function ProductCard({product,tag}: {product: Product; tag?:string}) {
  return (
    <Link href={`/product/${product.id}`} className='group block'>
        
    {/* The image div */}
    <div className='relative aspect-[3/4] overflow-hidden bg-sand rounded-2xl'>
        <Image
        src={product.thumbnail}
        alt={product.title}
        fill
        sizes='(max-width:768px) 50vw, 25vw'
        className='object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105'
        />
        {tag && (
            <span className='absolute top-3 left-3 bg-cream rounded-full px-2 py-1 text-[10px]'>
                {tag}
            </span>
        )}
    </div>

    <div className='mt-3 flex items-start justify-between gap-3'>
        <div>
            <p className='font-mono text-[10px] text-forest/60'>{categoryLabel(product.category)}</p>
            <p className='font-display text-base font-semibold leading-snug text-forest'>{product.title}</p>
        </div>

        <p className='text-sm text-forest'>{formatPrice(salePrice(product.price,product.discountPercentage))}</p>
    </div>
        
    </Link>
  )
}

export default ProductCard