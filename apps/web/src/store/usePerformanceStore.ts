import { create } from 'zustand';

interface PerformanceStore {
  initialized: boolean;
}

export const usePerformanceStore = create<PerformanceStore>((set) => ({
  initialized: false,
}));
