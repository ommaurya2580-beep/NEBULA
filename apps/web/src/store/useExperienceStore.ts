import { create } from 'zustand';

interface ExperienceStore {
  initialized: boolean;
}

export const useExperienceStore = create<ExperienceStore>(() => ({
  initialized: false,
}));
