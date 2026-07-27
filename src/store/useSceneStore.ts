import { create } from 'zustand';

interface SceneStore {
  initialized: boolean;
}

export const useSceneStore = create<SceneStore>(() => ({
  initialized: false,
}));
