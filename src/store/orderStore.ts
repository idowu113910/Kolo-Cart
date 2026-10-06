import { useState, useEffect } from 'react';
import { Order, CartItem, DeliveryAddress, FulfilmentType } from '../types';
import { initialOrders } from '../data/orders';
import { generateOrderNumber } from '../utils/format';
import { cartStore } from './cartStore';

const STORAGE_KEY = 'kolocart_orders_history';

type Listener = () => void;
const listeners = new Set<Listener>();

function loadOrders(): Order[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Failed to load orders', e);
  }
  return initialOrders;
}

let ordersState: Order[] = loadOrders();

function emitChange() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ordersState));
  listeners.forEach(l => l());
}

export interface PlaceOrderParams {
  supermarketId: string;
  supermarketName: string;
  items: CartItem[];
  fulfilmentType: FulfilmentType;
  deliveryAddress?: DeliveryAddress;
  deliveryTime: string;
  paymentMethod: string;
  productTotal: number;
  deliveryFee: number;
  total: number;
}

export const orderStore = {
  getOrders(): Order[] {
    return ordersState;
  },

  getOrderById(id: string): Order | undefined {
    return ordersState.find(o => o.id === id || o.orderNumber === id);
  },

  placeOrder(params: PlaceOrderParams): Order {
    const orderNumber = generateOrderNumber();
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      supermarketId: params.supermarketId,
      supermarketName: params.supermarketName,
      items: [...params.items],
      fulfilmentType: params.fulfilmentType,
      deliveryAddress: params.deliveryAddress,
      deliveryTime: params.deliveryTime,
      paymentMethod: params.paymentMethod,
      productTotal: params.productTotal,
      deliveryFee: params.deliveryFee,
      total: params.total,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      estimatedTime: params.fulfilmentType === 'delivery' ? '20 - 30 mins' : 'Ready in 15 mins',
    };

    ordersState = [newOrder, ...ordersState];
    emitChange();
    
    // Clear cart once order is placed!
    cartStore.clear();

    return newOrder;
  },

  updateStatus(orderId: string, status: Order['status']) {
    ordersState = ordersState.map(o => o.id === orderId ? { ...o, status } : o);
    emitChange();
  },

  subscribe(listener: Listener) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }
};

export function useOrderStore() {
  const [orders, setOrders] = useState<Order[]>(orderStore.getOrders());

  useEffect(() => {
    return orderStore.subscribe(() => {
      setOrders(orderStore.getOrders());
    });
  }, []);

  return {
    orders,
    getOrderById: orderStore.getOrderById.bind(orderStore),
    placeOrder: orderStore.placeOrder.bind(orderStore),
    updateStatus: orderStore.updateStatus.bind(orderStore),
  };
}
