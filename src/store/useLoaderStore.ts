import { create } from 'zustand';

interface LoaderStore {
  initialized: boolean;
}

export const useLoaderStore = create<LoaderStore>(() => ({
  initialized: false,
}));
