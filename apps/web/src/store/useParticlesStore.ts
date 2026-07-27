import { create } from 'zustand';

interface ParticlesStore {
  initialized: boolean;
}

export const useParticlesStore = create<ParticlesStore>(() => ({
  initialized: false,
}));
