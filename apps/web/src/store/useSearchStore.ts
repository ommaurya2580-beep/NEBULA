import { create } from 'zustand';

interface SearchStore {
  initialized: boolean;
}

export const useSearchStore = create<SearchStore>((set) => ({
  initialized: false,
}));
