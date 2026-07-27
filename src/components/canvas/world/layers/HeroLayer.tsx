'use client';

import { useFrame } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useExperienceStore } from '@/store/useExperienceStore';
import { experienceEngine } from '@/engine/ExperienceEngine';

/**
 * HeroLayer
 * Central premium 3D object.
 * Uses smooth frame-based lerp for high performance & clean TypeScript compilation.
 */
export function HeroLayer() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const { currentState } = useExperienceStore();
  const [hovered, setHovered] = useState(false);

  // Change cursor globally on hover over 3D object
  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'none';
  }, [hovered]);

  useFrame((state, delta) => {
    if (meshRef.current && currentState !== 'BOOT') {
      // Gentle floating animation (slower if hovered)
      const speedMult = hovered ? 0.2 : 1;
      meshRef.current.rotation.y += delta * 0.2 * speedMult;
      meshRef.current.rotation.x += delta * 0.1 * speedMult;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;

      // Smooth lerp scale on hover
      const targetScale = hovered ? 1.08 : 1.0;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

      // Smooth lerp emissive intensity on hover
      if (materialRef.current) {
        const targetEmissive = hovered ? 0.5 : 0.0;
        materialRef.current.emissiveIntensity = THREE.MathUtils.lerp(
          materialRef.current.emissiveIntensity,
          targetEmissive,
          0.1
        );
      }
    }
  });

  if (currentState === 'BOOT') return null;

  const GroupTag = 'group' as any;
  const MeshTag = 'mesh' as any;
  const TorusKnotTag = 'torusKnotGeometry' as any;
  const MeshPhysicalTag = 'meshPhysicalMaterial' as any;

  return (
    <GroupTag name="hero-layer">
      <MeshTag 
        ref={meshRef} 
        castShadow 
        receiveShadow
        onPointerOver={(e: any) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
        onClick={(e: any) => {
          e.stopPropagation();
          if (currentState === 'WORLD') {
            experienceEngine.transitionTo('DETAIL');
          }
        }}
      >
        {/* An elegant geometric shape to refract light */}
        <TorusKnotTag args={[1, 0.3, 256, 64]} />
        
        {/* Luxury Glass Material */}
        <MeshPhysicalTag
          ref={materialRef}
          color="#ffffff"
          metalness={0.1}
          roughness={0.05}
          transmission={1} // Glass effect
          ior={1.5}
          thickness={0.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
          emissive="#00ffcc"
          emissiveIntensity={0}
        />
      </MeshTag>
    </GroupTag>
  );
}
