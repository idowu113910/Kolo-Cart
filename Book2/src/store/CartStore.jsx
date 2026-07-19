import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],

      addToCart: (item) => {
        const existingCart = get().cartItems;
        const itemIndex = existingCart.findIndex(
          (cartItem) => cartItem.id === item.id
        );

        if (itemIndex > -1) {
          // Item exists, increase quantity
          set({
            cartItems: existingCart.map((cartItem, index) =>
              index === itemIndex
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
            ),
          });
        } else {
          // New item, add to cart
          set({
            cartItems: [...existingCart, { ...item, quantity: 1 }],
          });
        }
      },

      removeFromCart: (id) => {
        set({
          cartItems: get().cartItems.filter((item) => item.id !== id),
        });
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(id);
        } else {
          set({
            cartItems: get().cartItems.map((item) =>
              item.id === id ? { ...item, quantity } : item
            ),
          });
        }
      },

      getTotalItems: () => {
        return get().cartItems.reduce(
          (total, item) => total + item.quantity,
          0
        );
      },

      getTotalPrice: () => {
        return get().cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: "cart-storage", // localStorage key
    }
  )
);

