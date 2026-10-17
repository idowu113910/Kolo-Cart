import { useState, useEffect } from 'react';
import { FulfilmentType } from '../types';

interface CheckoutState {
  fulfilmentType: FulfilmentType;
  selectedAddressId: string;
  deliveryTime: string;
  paymentMethod: string;
}

const STORAGE_KEY = 'kolocart_checkout_state';

type Listener = () => void;
const listeners = new Set<Listener>();

function loadState(): CheckoutState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load checkout state', e);
  }
  return {
    fulfilmentType: 'delivery',
    selectedAddressId: 'addr-1',
    deliveryTime: 'As soon as possible (20 - 30 mins)',
    paymentMethod: 'Cash on delivery',
  };
}

let checkoutState: CheckoutState = loadState();

function emitChange() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(checkoutState));
  listeners.forEach(l => l());
}

export const checkoutStore = {
  getState(): CheckoutState {
    return checkoutState;
  },

  setFulfilmentType(type: FulfilmentType) {
    checkoutState.fulfilmentType = type;
    if (type === 'pickup') {
      checkoutState.paymentMethod = 'Pay at the supermarket';
      checkoutState.deliveryTime = 'Meet receptionist (Any time before 9pm)';
    } else {
      checkoutState.paymentMethod = 'Cash on delivery';
      checkoutState.deliveryTime = 'As soon as possible (20 - 30 mins)';
    }
    emitChange();
  },

  setSelectedAddressId(id: string) {
    checkoutState.selectedAddressId = id;
    emitChange();
  },

  setDeliveryTime(time: string) {
    checkoutState.deliveryTime = time;
    emitChange();
  },

  setPaymentMethod(method: string) {
    checkoutState.paymentMethod = method;
    emitChange();
  },

  reset() {
    checkoutState = {
      fulfilmentType: 'delivery',
      selectedAddressId: 'addr-1',
      deliveryTime: 'As soon as possible (20 - 30 mins)',
      paymentMethod: 'Cash on delivery',
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

export function useCheckoutStore() {
  const [state, setState] = useState<CheckoutState>(checkoutStore.getState());

  useEffect(() => {
    return checkoutStore.subscribe(() => {
      setState(checkoutStore.getState());
    });
  }, []);

  return {
    ...state,
    setFulfilmentType: checkoutStore.setFulfilmentType.bind(checkoutStore),
    setSelectedAddressId: checkoutStore.setSelectedAddressId.bind(checkoutStore),
    setDeliveryTime: checkoutStore.setDeliveryTime.bind(checkoutStore),
    setPaymentMethod: checkoutStore.setPaymentMethod.bind(checkoutStore),
    resetCheckout: checkoutStore.reset.bind(checkoutStore),
  };
}
