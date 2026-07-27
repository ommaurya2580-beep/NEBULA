import { create } from 'zustand';

interface AudioStore {
  initialized: boolean;
}

export const useAudioStore = create<AudioStore>(() => ({
  initialized: false,
}));
