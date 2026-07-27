'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useExperienceStore } from '@/store/useExperienceStore';
import gsap from 'gsap';

/**
 * CameraRig
 * Replaces OrbitControls. Orchestrates cinematic camera movements based on the 12-state Experience Engine.
 */
export function CameraRig() {
  const { camera } = useThree();
  const { currentState } = useExperienceStore();
  const groupRef = useRef<THREE.Group>(null);
  const targetRef = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    // Cinematic camera positions mapped to Experience States
    const positions: Record<string, { pos: [number, number, number]; lookAt: [number, number, number]; fov: number }> = {
      BOOT: { pos: [0, 0, 15], lookAt: [0, 0, 0], fov: 35 },
      LOADING: { pos: [0, 0, 12], lookAt: [0, 0, 0], fov: 40 },
      INTRO: { pos: [0, 1, 8], lookAt: [0, 0.5, 0], fov: 45 },
      BRAND: { pos: [2, 1, 6], lookAt: [0, 0, 0], fov: 45 },
      WORLD: { pos: [0, 0, 6], lookAt: [0, 0, 0], fov: 45 },
      COLLECTION: { pos: [0, 0, 7], lookAt: [0, 0, 0], fov: 40 },
      PRODUCT: { pos: [0, 0, 4], lookAt: [0, 0, 0], fov: 35 },
      DETAIL: { pos: [0, 0, 2], lookAt: [0, 0, 0], fov: 30 },
      CUSTOMIZATION: { pos: [0, 0.5, 3], lookAt: [0, 0, 0], fov: 35 },
      CART: { pos: [0, 0, 5], lookAt: [0, 0, 0], fov: 40 },
      CHECKOUT: { pos: [0, 0, 5], lookAt: [0, 0, 0], fov: 40 },
      OUTRO: { pos: [0, 0, 15], lookAt: [0, 0, 0], fov: 50 },
    };

    const targetConfig = positions[currentState] || positions.BOOT;

    // Animate Camera Position
    gsap.to(camera.position, {
      x: targetConfig.pos[0],
      y: targetConfig.pos[1],
      z: targetConfig.pos[2],
      duration: 2.5,
      ease: 'power3.inOut',
    });

    // Animate FOV (requires updating projection matrix)
    gsap.to(camera as THREE.PerspectiveCamera, {
      fov: targetConfig.fov,
      duration: 2.5,
      ease: 'power3.inOut',
      onUpdate: () => {
        (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
      },
    });

    // Animate LookAt Target
    gsap.to(targetRef.current, {
      x: targetConfig.lookAt[0],
      y: targetConfig.lookAt[1],
      z: targetConfig.lookAt[2],
      duration: 2.5,
      ease: 'power3.inOut',
    });
  }, [currentState, camera]);

  useFrame((state) => {
    // 1. Constantly look at the animated target
    camera.lookAt(targetRef.current);

    // 2. Subtle Parallax Effect (Mouse Intention)
    // "Mouse does not move objects. Creates intention."
    if (groupRef.current) {
      // Lerp the group rotation slightly based on mouse position
      const targetX = (state.pointer.x * Math.PI) / 10;
      const targetY = (state.pointer.y * Math.PI) / 10;
      
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.05);
    }
  });

  const GroupTag = 'group' as any;
  return <GroupTag ref={groupRef} name="camera-rig-parallax-group" />;
}
