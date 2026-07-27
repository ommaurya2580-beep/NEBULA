import { create } from 'zustand';

import { ExperienceState } from '../engine/ExperienceEngine';

interface ExperienceStore {
  initialized: boolean;
  currentState: ExperienceState;
  setCurrentState: (state: ExperienceState) => void;
}

export const useExperienceStore = create<ExperienceStore>((set) => ({
  initialized: false,
  currentState: 'BOOT',
  setCurrentState: (state) => set({ currentState: state }),
}));
