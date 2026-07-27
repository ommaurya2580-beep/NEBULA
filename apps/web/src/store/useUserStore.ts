import { create } from 'zustand';

interface UserStore {
  initialized: boolean;
}

export const useUserStore = create<UserStore>((set) => ({
  initialized: false,
}));
