import { create } from 'zustand';

interface WorldStore {
  initialized: boolean;
}

export const useWorldStore = create<WorldStore>(() => ({
  initialized: false,
}));
