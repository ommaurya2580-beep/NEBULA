import { create } from 'zustand';

interface CommerceStore {
  initialized: boolean;
}

export const useCommerceStore = create<CommerceStore>((set) => ({
  initialized: false,
}));
