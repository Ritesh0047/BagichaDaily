import type { Product, WeightValue } from './products';
import { isProductAvailable, PACK_WEIGHT } from './products';
import { WHATSAPP_PHONE } from '../consts';

export const CART_STORAGE_KEY = 'bagicha-cart';
export const CART_UPDATE_EVENT = 'bagicha-cart-update';

export interface CartItem extends Product {
  quantity: number;
  weight: WeightValue;
}

export function getWeightPrice(price: number): number {
  return price;
}

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return [];

  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    const cart = saved ? (JSON.parse(saved) as CartItem[]) : [];
    return cart.filter((item) => item.weight === PACK_WEIGHT);
  } catch {
    return [];
  }
}

export function setCart(cart: CartItem[]): void {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  dispatchCartUpdate();
}

export function dispatchCartUpdate(): void {
  window.dispatchEvent(new CustomEvent(CART_UPDATE_EVENT));
}

export function getCartCount(cart: CartItem[] = getCart()): number {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

export function getCartTotal(cart: CartItem[] = getCart()): number {
  return cart.reduce(
    (sum, item) => sum + getWeightPrice(item.price) * item.quantity,
    0
  );
}

export function addToCart(product: Product, quantity = 1): void {
  if (!isProductAvailable(product)) return;

  const weight = PACK_WEIGHT;
  const cart = getCart();
  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    setCart(
      cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      )
    );
    return;
  }

  setCart([...cart, { ...product, quantity, weight }]);
}

export function removeFromCart(productId: number): void {
  setCart(getCart().filter((item) => item.id !== productId));
}

export function updateQuantity(productId: number, quantity: number): void {
  if (quantity < 1) {
    removeFromCart(productId);
    return;
  }

  setCart(
    getCart().map((item) =>
      item.id === productId ? { ...item, quantity } : item
    )
  );
}

export function clearCart(): void {
  setCart([]);
}

export function buildCartWhatsAppMessage(
  cart: CartItem[],
  cartTotal: number
): string {
  const lines = cart.map(
    (item) =>
      `• ${item.name} (${item.packSize}) x${item.quantity} - ₹${getWeightPrice(item.price) * item.quantity}`
  );

  return `Hi! I'd like to place an order:

${lines.join('\n')}

*Total: ₹${cartTotal}*

Please confirm and let me know delivery details.`;
}

export function buildProductWhatsAppMessage(
  product: Product,
  quantity: number
): string {
  const total = getWeightPrice(product.price) * quantity;

  return `Hi! I'd like to order:
*${product.name}* (${product.variety})
- Pack: ${product.packSize}
- Quantity: ${quantity} pack(s)
- Total: ₹${total}

Please confirm availability.`;
}

export function openWhatsApp(message: string): void {
  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`, '_blank');
}
