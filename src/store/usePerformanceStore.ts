import { create } from 'zustand';

interface PerformanceStore {
  dpr: number;
  fps: number;
  setDpr: (dpr: number) => void;
  setFps: (fps: number) => void;
}

export const usePerformanceStore = create<PerformanceStore>((set) => ({
  dpr: 1,
  fps: 60,
  setDpr: (dpr) => set({ dpr }),
  setFps: (fps) => set({ fps })
}));
