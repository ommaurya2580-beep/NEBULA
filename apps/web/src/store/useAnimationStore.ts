import { create } from 'zustand';

interface AnimationStore {
  initialized: boolean;
}

export const useAnimationStore = create<AnimationStore>((set) => ({
  initialized: false,
}));
