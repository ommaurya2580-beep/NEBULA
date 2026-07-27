import { create } from 'zustand';

interface ThemeStore {
  initialized: boolean;
}

export const useThemeStore = create<ThemeStore>(() => ({
  initialized: false,
}));
