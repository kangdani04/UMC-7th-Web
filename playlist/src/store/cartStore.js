// src/store/cartStore.js

import { create } from 'zustand';  // `zustand`에서 기본 내보내기 대신, 명명된 내보내기를 사용합니다.

const useCartStore = create((set) => ({
  cartItems: [],
  amount: 0,
  total: 0,
  addToCart: (item) => set((state) => {
    const updatedCartItems = [...state.cartItems, item];
    const updatedTotal = updatedCartItems.reduce((total, item) => total + item.amount * item.price, 0);
    const updatedAmount = updatedCartItems.reduce((amount, item) => amount + item.amount, 0);
    return {
      cartItems: updatedCartItems,
      total: updatedTotal,
      amount: updatedAmount,
    };
  }),
  removeFromCart: (id) => set((state) => {
    const updatedCartItems = state.cartItems.filter(item => item.id !== id);
    const updatedTotal = updatedCartItems.reduce((total, item) => total + item.amount * item.price, 0);
    const updatedAmount = updatedCartItems.reduce((amount, item) => amount + item.amount, 0);
    return {
      cartItems: updatedCartItems,
      total: updatedTotal,
      amount: updatedAmount,
    };
  }),
}));

export default useCartStore;
