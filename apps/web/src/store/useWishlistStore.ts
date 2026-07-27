import { create } from 'zustand';

interface WishlistStore {
  initialized: boolean;
}

export const useWishlistStore = create<WishlistStore>((set) => ({
  initialized: false,
}));
