import { useState, useEffect } from 'react';
import { UserProfile, DeliveryAddress, PaymentMethod, AppSettings } from '../types';

const STORAGE_KEY = 'kolocart_user_store';

interface UserStoreData {
  profile: UserProfile;
  addresses: DeliveryAddress[];
  paymentMethods: PaymentMethod[];
  settings: AppSettings;
}

const defaultData: UserStoreData = {
  profile: {
    id: 'user-helen',
    title: 'Mrs. Helen',
    fullName: 'Helen Nkem Okeke',
    phone: '09132515670',
    email: 'helen.okeke@gmail.com',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
  },
  addresses: [
    {
      id: 'addr-1',
      label: 'Home',
      addressLine: 'No 3 Precious road Upper meniru busstop agbani road',
      city: 'Enugu',
      state: 'Enugu State',
      isDefault: true,
      phone: '09132515670',
      instructions: 'Gate is painted blue, ring bell twice',
    },
    {
      id: 'addr-2',
      label: 'Office',
      addressLine: 'Plot 14 Presidential Road, Independence Layout',
      city: 'Enugu',
      state: 'Enugu State',
      isDefault: false,
      phone: '09132515670',
      instructions: 'Leave with reception on 2nd floor',
    }
  ],
  paymentMethods: [
    {
      id: 'pay-1',
      type: 'cash_on_delivery',
      name: 'Cash on delivery',
      description: 'Pay cash or transfer upon receiving your groceries',
      isDefault: true,
    },
    {
      id: 'pay-2',
      type: 'pay_at_supermarket',
      name: 'Pay at the supermarket',
      description: 'Pay directly when picking up your order',
      isDefault: false,
    },
    {
      id: 'pay-3',
      type: 'card',
      name: 'Debit Card (•••• 4112)',
      description: 'Expires 08/28 (Instant debit)',
      isDefault: false,
    },
    {
      id: 'pay-4',
      type: 'bank_transfer',
      name: 'Direct Bank Transfer',
      description: 'Instant transfer to verified store account',
      isDefault: false,
    }
  ],
  settings: {
    darkMode: false,
    notificationsEnabled: true,
    orderStatusAlerts: true,
    promotionsAlerts: false,
    currency: 'NGN',
    language: 'English',
  }
};

function loadUserData(): UserStoreData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load user store data', e);
  }
  return defaultData;
}

let userData: UserStoreData = loadUserData();
type Listener = () => void;
const listeners = new Set<Listener>();

function emitChange() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
  listeners.forEach(l => l());
}

export const userStore = {
  getProfile(): UserProfile {
    return userData.profile;
  },

  getAddresses(): DeliveryAddress[] {
    return userData.addresses;
  },

  getDefaultAddress(): DeliveryAddress | undefined {
    return userData.addresses.find(a => a.isDefault) || userData.addresses[0];
  },

  getAddressById(id: string): DeliveryAddress | undefined {
    return userData.addresses.find(a => a.id === id);
  },

  getPaymentMethods(): PaymentMethod[] {
    return userData.paymentMethods;
  },

  getDefaultPaymentMethod(): PaymentMethod | undefined {
    return userData.paymentMethods.find(p => p.isDefault) || userData.paymentMethods[0];
  },

  getSettings(): AppSettings {
    return userData.settings;
  },

  updateProfile(partial: Partial<UserProfile>) {
    userData.profile = { ...userData.profile, ...partial };
    emitChange();
  },

  addAddress(address: Omit<DeliveryAddress, 'id'>) {
    const newAddress: DeliveryAddress = {
      ...address,
      id: `addr-${Date.now()}`,
    };
    if (newAddress.isDefault) {
      userData.addresses = userData.addresses.map(a => ({ ...a, isDefault: false }));
    }
    userData.addresses = [...userData.addresses, newAddress];
    emitChange();
    return newAddress;
  },

  updateAddress(id: string, partial: Partial<DeliveryAddress>) {
    if (partial.isDefault) {
      userData.addresses = userData.addresses.map(a => ({
        ...a,
        isDefault: a.id === id,
      }));
    }
    userData.addresses = userData.addresses.map(a =>
      a.id === id ? { ...a, ...partial } : a
    );
    emitChange();
  },

  deleteAddress(id: string) {
    userData.addresses = userData.addresses.filter(a => a.id !== id);
    if (userData.addresses.length > 0 && !userData.addresses.some(a => a.isDefault)) {
      userData.addresses[0].isDefault = true;
    }
    emitChange();
  },

  setDefaultAddress(id: string) {
    userData.addresses = userData.addresses.map(a => ({
      ...a,
      isDefault: a.id === id,
    }));
    emitChange();
  },

  setDefaultPaymentMethod(id: string) {
    userData.paymentMethods = userData.paymentMethods.map(p => ({
      ...p,
      isDefault: p.id === id,
    }));
    emitChange();
  },

  updateSettings(partial: Partial<AppSettings>) {
    userData.settings = { ...userData.settings, ...partial };
    emitChange();
  },

  subscribe(listener: Listener) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }
};

export function useUserStore() {
  const [data, setData] = useState<UserStoreData>(() => ({
    profile: userStore.getProfile(),
    addresses: userStore.getAddresses(),
    paymentMethods: userStore.getPaymentMethods(),
    settings: userStore.getSettings(),
  }));

  useEffect(() => {
    return userStore.subscribe(() => {
      setData({
        profile: userStore.getProfile(),
        addresses: userStore.getAddresses(),
        paymentMethods: userStore.getPaymentMethods(),
        settings: userStore.getSettings(),
      });
    });
  }, []);

  return {
    profile: data.profile,
    addresses: data.addresses,
    defaultAddress: data.addresses.find(a => a.isDefault) || data.addresses[0],
    paymentMethods: data.paymentMethods,
    defaultPaymentMethod: data.paymentMethods.find(p => p.isDefault) || data.paymentMethods[0],
    settings: data.settings,
    updateProfile: userStore.updateProfile.bind(userStore),
    addAddress: userStore.addAddress.bind(userStore),
    updateAddress: userStore.updateAddress.bind(userStore),
    deleteAddress: userStore.deleteAddress.bind(userStore),
    setDefaultAddress: userStore.setDefaultAddress.bind(userStore),
    setDefaultPaymentMethod: userStore.setDefaultPaymentMethod.bind(userStore),
    updateSettings: userStore.updateSettings.bind(userStore),
  };
}
