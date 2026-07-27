import { create } from 'zustand';

interface AudioStore {
  initialized: boolean;
}

export const useAudioStore = create<AudioStore>((set) => ({
  initialized: false,
}));
