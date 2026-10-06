import { useState, useEffect } from 'react';
import { Product, CartItem } from '../types';
import { getSupermarketById } from '../data';
import { calculateSubtotal, calculateDeliveryFee, calculateTotal } from '../utils/pricing';

const STORAGE_KEY = 'kolocart_cart_data';

export interface CartConflictInfo {
  incomingProduct: Product;
  incomingSupermarketId: string;
  currentSupermarketName: string;
  incomingSupermarketName: string;
}

interface CartState {
  supermarketId: string | null;
  items: CartItem[];
}

type Listener = () => void;
const listeners = new Set<Listener>();

function loadState(): CartState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed.items)) {
        return {
          supermarketId: parsed.supermarketId || (parsed.items.length > 0 ? parsed.items[0].product.supermarketId : null),
          items: parsed.items,
        };
      }
    }
  } catch (e) {
    console.error('Failed to load cart state', e);
  }

  // Pre-seed cart with 3 items matching Figma screenshot!
  // Figma shows: Fresh Tomatoes (1kg) qty 2, Hollandia Yogurt (500cl) qty 2, Hollandia Yogurt (500cl) qty 2 (or similar)
  return {
    supermarketId: 'icecold-bird',
    items: [
      {
        product: {
          id: 'prod-ice-1',
          supermarketId: 'icecold-bird',
          categoryId: 'fruits-vegetables',
          name: 'Fresh Tomatoes (1kg)',
          price: 1450.07,
          unit: '1kg',
          imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&auto=format&fit=crop&q=80',
          uploadedAgo: '55m ago',
          description: 'Plump, firm, vine-ripened red tomatoes sourced freshly every morning.',
          inStock: true,
          stockCount: 84,
        },
        quantity: 2,
        addedAt: new Date(Date.now() - 5000).toISOString(), // "Added 05s ago"
      },
      {
        product: {
          id: 'prod-ice-8',
          supermarketId: 'icecold-bird',
          categoryId: 'protein-dairy',
          name: 'Hollandia Yogurt (500cl)',
          price: 1450.07,
          unit: '500cl',
          imageUrl: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=400&auto=format&fit=crop&q=80',
          uploadedAgo: '55m ago',
          description: 'Smooth, creamy, and delightfully refreshing fruit-flavored drinking yogurt.',
          inStock: true,
          stockCount: 110,
        },
        quantity: 2,
        addedAt: new Date(Date.now() - 10000).toISOString(),
      },
      {
        product: {
          id: 'prod-ice-2',
          supermarketId: 'icecold-bird',
          categoryId: 'fruits-vegetables',
          name: 'Fresh Okro (1kg)',
          price: 550.00,
          unit: '1kg',
          imageUrl: 'https://images.unsplash.com/photo-1525607551316-4a8e16d1f9ba?w=400&auto=format&fit=crop&q=80',
          uploadedAgo: '51m ago',
          description: 'Crisp green okra pods with high viscosity.',
          inStock: true,
          stockCount: 60,
        },
        quantity: 1,
        addedAt: new Date(Date.now() - 25000).toISOString(),
      }
    ]
  };
}

let cartState: CartState = loadState();

function emitChange() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartState));
  } catch (e) {
    console.error('Failed to save cart state', e);
  }
  listeners.forEach(l => l());
}

export const cartStore = {
  getState(): CartState {
    return cartState;
  },

  addItem(product: Product, supermarketId: string): { success: boolean; conflict?: CartConflictInfo } {
    // If cart has items from a different supermarket, trigger conflict!
    if (cartState.items.length > 0 && cartState.supermarketId && cartState.supermarketId !== supermarketId) {
      const currentStore = getSupermarketById(cartState.supermarketId);
      const incomingStore = getSupermarketById(supermarketId);
      return {
        success: false,
        conflict: {
          incomingProduct: product,
          incomingSupermarketId: supermarketId,
          currentSupermarketName: currentStore?.name || 'Current Store',
          incomingSupermarketName: incomingStore?.name || 'Selected Store',
        }
      };
    }

    const existingIndex = cartState.items.findIndex(item => item.product.id === product.id);
    let newItems: CartItem[];

    if (existingIndex >= 0) {
      newItems = cartState.items.map((item, idx) =>
        idx === existingIndex
          ? { ...item, quantity: item.quantity + 1, addedAt: new Date().toISOString() }
          : item
      );
    } else {
      newItems = [
        ...cartState.items,
        { product, quantity: 1, addedAt: new Date().toISOString() }
      ];
    }

    cartState = {
      supermarketId,
      items: newItems,
    };
    emitChange();
    return { success: true };
  },

  forceAddItem(product: Product, supermarketId: string) {
    cartState = {
      supermarketId,
      items: [{ product, quantity: 1, addedAt: new Date().toISOString() }],
    };
    emitChange();
  },

  removeItem(productId: string) {
    const newItems = cartState.items.filter(item => item.product.id !== productId);
    cartState = {
      supermarketId: newItems.length === 0 ? null : cartState.supermarketId,
      items: newItems,
    };
    emitChange();
  },

  setQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      this.removeItem(productId);
      return;
    }
    const newItems = cartState.items.map(item =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    cartState = {
      ...cartState,
      items: newItems,
    };
    emitChange();
  },

  clear() {
    cartState = {
      supermarketId: null,
      items: [],
    };
    emitChange();
  },

  subscribe(listener: Listener) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }
};

/**
 * Custom React hook for subscribing to cart state
 */
export function useCartStore() {
  const [state, setState] = useState<CartState>(cartStore.getState());

  useEffect(() => {
    return cartStore.subscribe(() => {
      setState(cartStore.getState());
    });
  }, []);

  const store = state.supermarketId ? getSupermarketById(state.supermarketId) : undefined;
  const storeDeliveryFee = store?.deliveryFee ?? 500;

  const subtotal = calculateSubtotal(state.items);
  const deliveryFee = calculateDeliveryFee('delivery', storeDeliveryFee, subtotal);
  const total = calculateTotal(subtotal, deliveryFee);
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    supermarketId: state.supermarketId,
    supermarket: store,
    items: state.items,
    itemCount,
    subtotal,
    deliveryFee,
    total,
    addItem: cartStore.addItem.bind(cartStore),
    forceAddItem: cartStore.forceAddItem.bind(cartStore),
    removeItem: cartStore.removeItem.bind(cartStore),
    setQuantity: cartStore.setQuantity.bind(cartStore),
    clearCart: cartStore.clear.bind(cartStore),
  };
}
