import { debug } from "node:console";

const BASE_URL = "https://dummyjson.com";

export type Product = {
    id: number;
    title: string;
    description: string;
    category: string; //mens-shirts
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand?: string;
    thumbnail: string;
    images : string[]; //array of photo link strings

}

export const CATEGORIES =[
    {label:"Shirts", slug:"mens-shirts"},
    {label:"Footwear", slug:"mens-shoes"},
    {label:"Watches", slug:"mens-watches"},
    {label:"Eyewear", slug:"sunglasses"}
]

// Convert slugs to Category labels
export function categoryLabel(slug:string): string{
    return CATEGORIES.find((c)=> c.slug === slug)?.label ?? slug;
}


//Helper function for api request

async function getJSON<T>(path:string): Promise<T>{
    
    const res = await fetch(`${BASE_URL}${path}`,{next:{revalidate : 3600}}); //caches response for the next hour
    if(!res.ok) throw new Error(`API request failed: ${res.status}`)

    return res.json();
}


//function to return products inside a category
export async function getProductsByCategory(category: string):Promise<Product[]>{
    const data = await getJSON<{products: Product[]}>(`/products/category/${category}`);
    return data.products;
} 



// list = [[{},{}],[],[]] ---> [{},{}]
export async function getAllProducts():Promise<Product[]>{
    const lists = await Promise.all(CATEGORIES.map((c)=> getProductsByCategory(c.slug)))
    return lists.flat()
}

//function to get one product by its id

export async function getProduct(id:string): Promise<Product>{
    return getJSON<Product>(`/products/${id}`)
}

