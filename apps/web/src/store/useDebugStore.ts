import { create } from 'zustand';

interface DebugStore {
  initialized: boolean;
}

export const useDebugStore = create<DebugStore>((set) => ({
  initialized: false,
}));
