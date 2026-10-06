import { CartItem, FulfilmentType } from '../types';

/**
 * Calculates subtotal for an array of cart items
 */
export function calculateSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
}

/**
 * Calculates delivery fee based on fulfilment type and store base fee
 */
export function calculateDeliveryFee(
  fulfilmentType: FulfilmentType,
  storeDeliveryFee: number = 500,
  subtotal: number = 0
): number {
  if (fulfilmentType === 'pickup') {
    return 0;
  }
  // Free delivery for orders above ₦100,000 as promotion
  if (subtotal >= 100000) {
    return 0;
  }
  return storeDeliveryFee;
}

/**
 * Calculates final total
 */
export function calculateTotal(subtotal: number, deliveryFee: number): number {
  return subtotal + deliveryFee;
}
