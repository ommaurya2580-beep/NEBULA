import { create } from 'zustand';

interface UIStore {
  debugVisible: boolean;
  toggleDebug: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  debugVisible: process.env.NODE_ENV === 'development',
  toggleDebug: () => set((state) => ({ debugVisible: !state.debugVisible }))
}));
