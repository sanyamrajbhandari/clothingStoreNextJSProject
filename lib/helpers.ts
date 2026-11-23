// Small things we reuse in many places.

// Change this one line to rename the whole store.
export const STORE_NAME = "Marlowe";

// 49.5 -> "$49.50"
export function formatPrice(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

// The API gives us the ORIGINAL price and a discount percentage.
// This works out the price the customer actually pays.
export function salePrice(price: number, discountPercentage: number): number {
  return price * (1 - discountPercentage / 100);
}
