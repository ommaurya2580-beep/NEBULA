'use client';

// import { useExperienceStore } from '@/store/useExperienceStore';
import { CameraRig } from '../camera/CameraRig';
import { EnvironmentLayer } from './layers/EnvironmentLayer';
import { HeroLayer } from './layers/HeroLayer';

/**
 * WorldEngine
 * The master visual orchestrator for the 3D scene.
 * It listens to the ExperienceEngine (via Zustand) and coordinates layers.
 */
export function WorldEngine() {

  return (
    <group name="world-engine">
      {/* 1. Camera Control */}
      <CameraRig />

      {/* 2. Atmospheric & Lighting Environment */}
      <EnvironmentLayer />

      {/* 3. Central Hero Object */}
      <HeroLayer />

      {/* 4. Product Universe (To be implemented) */}
      
      {/* 5. Post Processing (To be implemented) */}
    </group>
  );
}
