import { create } from 'zustand';

interface CursorStore {
  initialized: boolean;
}

export const useCursorStore = create<CursorStore>((set) => ({
  initialized: false,
}));
