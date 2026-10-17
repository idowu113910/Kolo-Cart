export interface Supermarket {
  id: string;
  name: string;
  rank: number;
  address: string;
  rating: number;
  reviewCount: number;
  openingTime: string;
  closingTime: string;
  isOpen: boolean;
  deliveryAvailable: boolean;
  clickAndCollect: boolean;
  deliveryFee: number;
  estimatedDeliveryTime: string;
  pricesUpdatedAgo: string;
  logoUrl: string;
  bannerUrl: string;
  categoryIds: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description?: string;
  bannerUrl?: string;
}

export interface Product {
  id: string;
  supermarketId: string;
  categoryId: string;
  name: string;
  price: number;
  originalPrice?: number;
  unit: string;
  imageUrl: string;
  uploadedAgo: string;
  description: string;
  inStock: boolean;
  stockCount: number;
  isFeatured?: boolean;
  tags?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  addedAt: string;
}

export type FulfilmentType = 'delivery' | 'pickup';

export interface DeliveryAddress {
  id: string;
  label: string;
  addressLine: string;
  city: string;
  state: string;
  isDefault: boolean;
  phone: string;
  instructions?: string;
}

export type PaymentMethodType = 'cash_on_delivery' | 'pay_at_supermarket' | 'card' | 'bank_transfer';

export interface PaymentMethod {
  id: string;
  type: PaymentMethodType;
  name: string;
  description: string;
  isDefault: boolean;
}

export type OrderStatus = 'placed' | 'confirmed' | 'packing' | 'out_for_delivery' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  orderNumber: string; // e.g. KC-784652
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
  status: OrderStatus;
  createdAt: string;
  estimatedTime: string;
}

export interface UserProfile {
  id: string;
  title: string;
  fullName: string;
  phone: string;
  email: string;
  avatarUrl: string;
}

export interface AppSettings {
  darkMode: boolean;
  notificationsEnabled: boolean;
  orderStatusAlerts: boolean;
  promotionsAlerts: boolean;
  currency: string;
  language: string;
}
