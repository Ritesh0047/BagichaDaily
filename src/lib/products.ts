import productsData from '../data/products.json';

export interface Product {
  id: number;
  name: string;
  variety: string;
  price: number;
  packSize: string;
  image: string;
  description: string;
  soldOut?: boolean;
  harvestingSoon?: boolean;
  gallery?: string[];
}

export const products: Product[] = productsData;

export const PACK_WEIGHT = '10kg' as const;
export type WeightValue = typeof PACK_WEIGHT;

export function getProductById(id: number): Product | undefined {
  return products.find((product) => product.id === id);
}

export function formatPackPrice(product: Product): string {
  return `₹${product.price.toLocaleString('en-IN')} / ${product.packSize}`;
}

export function isProductAvailable(product: Product): boolean {
  return !product.soldOut;
}

export function getProductCardImage(product: Product): string {
  if (product.image.startsWith('/products/') && product.image.endsWith('.webp')) {
    return product.image.replace('.webp', '-card.webp');
  }

  return product.image;
}
