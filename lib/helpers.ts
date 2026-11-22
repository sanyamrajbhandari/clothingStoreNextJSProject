//small functions we reuse throughout the project

export const STORE_NAME = "Marlowe"

export function formatPrice(amount:number):string{

    return `$${amount.toFixed(2)}`
}

//function to give us the actual sale price

export function salePrice(price:number, discountPercentage:number):number{
    return price * (1-discountPercentage/100);
}