import { create } from "zustand";
import { currentCart } from "@wix/ecom";
import { WixClient } from "@/context/wixContext";

type CartState = {
  cart: currentCart.Cart | null;
  isLoading: boolean;
  counter: number;
  getCart: (wixClient: WixClient) => void;
  addItem: (
    wixClient: WixClient,
    productId: string,
    variantId: string,
    quantity: number
  ) => void;
  removeItem: (wixClient: WixClient, itemId: string) => void;
  clearCart: (wixClient: WixClient) => void;
};

export const useCartStore = create<CartState>((set) => ({
  cart: null,
  isLoading: true,
  counter: 0,
  getCart: async (wixClient) => {
    try {
      const cart = await wixClient.currentCart.getCurrentCart();
      set({
        cart: cart || null,
        isLoading: false,
        counter: cart?.lineItems?.length || 0,
      });
    } catch (err) {
      set((prev) => ({ ...prev, cart: null, counter: 0, isLoading: false }));
    }
  },
  addItem: async (wixClient, productId, variantId, quantity) => {
    set((state) => ({ ...state, isLoading: true }));
    const response = await wixClient.currentCart.addToCurrentCart({
      lineItems: [
        {
          catalogReference: {
            appId: process.env.NEXT_PUBLIC_WIX_APP_ID!,
            catalogItemId: productId,
            ...(variantId && { options: { variantId } }),
          },
          quantity: quantity,
        },
      ],
    });

    set({
      cart: response.cart || null,
      counter: response.cart?.lineItems?.length || 0,
      isLoading: false,
    });
  },
  removeItem: async (wixClient, itemId) => {
    set((state) => ({ ...state, isLoading: true }));
    const response = await wixClient.currentCart.removeLineItemsFromCurrentCart(
      [itemId]
    );

    set({
      cart: response.cart || null,
      counter: response.cart?.lineItems?.length || 0,
      isLoading: false,
    });
  },
  clearCart: async (wixClient) => {
    set((state) => ({ ...state, isLoading: true }));
    try {
      await wixClient.currentCart.deleteCurrentCart();
    } catch (err) {
      // If there is no active cart (or deletion fails), still clear local UI state.
    }
    set({
      cart: null,
      counter: 0,
      isLoading: false,
    });
  },
}));