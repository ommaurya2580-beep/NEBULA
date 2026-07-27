import { create } from 'zustand';

interface RendererStore {
  initialized: boolean;
}

export const useRendererStore = create<RendererStore>(() => ({
  initialized: false,
}));
