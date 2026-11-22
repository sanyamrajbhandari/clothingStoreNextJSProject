import { getProduct } from '@/lib/api';
import { notFound } from 'next/navigation';
import React from 'react'

async function page({params}:{params: Promise<{id:string}>}) {
    const {id} = await params;

    // IF the api returns a product -> product stores it 
    let product;

    try{
        product = await getProduct(id);
        // console.log("Products fetched succesfully", product)
    } catch{
        notFound();
    }
    return (
    <div>This is the products detail page {id}</div>
  )
}

export default page