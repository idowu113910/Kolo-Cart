import { Supermarket, Category, Product, Order } from '../types';
import { supermarkets } from './supermarkets';
import { categories } from './categories';
import { products } from './products';
import { initialOrders } from './orders';

export * from './supermarkets';
export * from './categories';
export * from './products';
export * from './orders';

/**
 * Returns all supermarkets sorted by their rank (e.g. #1, #2, #3...)
 */
export function getRankedSupermarkets(): Supermarket[] {
  return [...supermarkets].sort((a, b) => a.rank - b.rank);
}

/**
 * Gets a supermarket by its ID
 */
export function getSupermarketById(id: string): Supermarket | undefined {
  return supermarkets.find(s => s.id === id);
}

/**
 * Returns categories available for a specific supermarket,
 * enriched with the count of products that this supermarket has in that category.
 * This directly powers the scalable Category page!
 */
export function getCategoriesForSupermarket(supermarketId: string): (Category & { productCount: number })[] {
  const store = getSupermarketById(supermarketId);
  if (!store) return [];

  const storeProducts = products.filter(p => p.supermarketId === supermarketId);

  return categories
    .filter(cat => store.categoryIds.includes(cat.id))
    .map(cat => {
      const count = storeProducts.filter(p => p.categoryId === cat.id).length;
      return {
        ...cat,
        productCount: count,
      };
    });
}

/**
 * Gets all products belonging to a supermarket, optionally filtered by category
 */
export function getProductsBySupermarket(supermarketId: string, categoryId?: string): Product[] {
  return products.filter(p => {
    if (p.supermarketId !== supermarketId) return false;
    if (categoryId && p.categoryId !== categoryId) return false;
    return true;
  });
}

/**
 * Gets a single product by ID
 */
export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

/**
 * Gets featured products for a supermarket
 */
export function getFeaturedProducts(supermarketId: string): Product[] {
  return products.filter(p => p.supermarketId === supermarketId && p.isFeatured);
}

/**
 * Searches products within a supermarket by name or tags
 */
export function searchProducts(supermarketId: string, query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return getProductsBySupermarket(supermarketId);

  return products.filter(p => {
    if (p.supermarketId !== supermarketId) return false;
    const nameMatch = p.name.toLowerCase().includes(q);
    const descMatch = p.description.toLowerCase().includes(q);
    const tagMatch = p.tags?.some(t => t.toLowerCase().includes(q));
    return nameMatch || descMatch || tagMatch;
  });
}

/**
 * Returns related products ("You may also like")
 */
export function getRelatedProducts(productId: string, limit: number = 4): Product[] {
  const current = getProductById(productId);
  if (!current) return [];

  return products
    .filter(p => p.id !== productId && (p.categoryId === current.categoryId || p.supermarketId === current.supermarketId))
    .slice(0, limit);
}
