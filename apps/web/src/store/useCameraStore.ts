import { create } from 'zustand';

interface CameraStore {
  initialized: boolean;
}

export const useCameraStore = create<CameraStore>((set) => ({
  initialized: false,
}));
