'use client';

import { Environment, Sparkles } from '@react-three/drei';
import { useExperienceStore } from '@/store/useExperienceStore';

/**
 * EnvironmentLayer
 * Controls the atmosphere, HDR lighting, fog, and ambient particles.
 * Reacts to Experience Engine states.
 */
export function EnvironmentLayer() {
  const { currentState } = useExperienceStore();

  // Determine intensity based on state
  const isBooting = currentState === 'BOOT';
  const ambientIntensity = isBooting ? 0 : 0.2;
  const keyLightIntensity = isBooting ? 0 : 2.5;

  return (
    <group name="environment-layer">
      {/* 1. Fog for atmospheric depth */}
      <fog attach="fog" args={['#050505', 5, 20]} />

      {/* 2. Global Illumination & Reflections */}
      {/* city preset provides a good modern/studio look */}
      {!isBooting && <Environment preset="city" environmentIntensity={0.5} />}

      {/* 3. Base Ambient */}
      <ambientLight intensity={ambientIntensity} />

      {/* 4. Cinematic Key Light (Directional) */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={keyLightIntensity}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={20}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      {/* 5. Rim Light (Accentuation for models) */}
      <directionalLight 
        position={[-5, 3, -5]} 
        intensity={keyLightIntensity * 0.5} 
        color="#a0c0ff" 
      />

      {/* 6. Dynamic Particles (Sparkles) */}
      {!isBooting && (
        <Sparkles
          count={150}
          scale={12}
          size={1.5}
          speed={0.2}
          opacity={0.3}
          noise={0.1}
          color="#ffffff"
        />
      )}
    </group>
  );
}
