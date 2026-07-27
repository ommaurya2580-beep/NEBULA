import { create } from 'zustand';

interface LightingStore {
  initialized: boolean;
}

export const useLightingStore = create<LightingStore>((set) => ({
  initialized: false,
}));
