import { create } from 'zustand';

interface ParticlesStore {
  initialized: boolean;
}

export const useParticlesStore = create<ParticlesStore>((set) => ({
  initialized: false,
}));
