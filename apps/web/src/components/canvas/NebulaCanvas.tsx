'use client';

import { Canvas, useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import { rendererManager } from '../../engine/RendererManager';
import { usePerformanceStore } from '../../store/usePerformanceStore';
// import { useUIStore } from '../../store/useUIStore';
// import { Perf } from 'r3f-perf';

const RendererConfig = () => {
  const { gl } = useThree();
  
  useEffect(() => {
    rendererManager.setRenderer(gl);
    
    return () => {
      rendererManager.destroy();
    };
  }, [gl]);

  return null;
};

export const NebulaCanvas = ({ children }: { children?: React.ReactNode }) => {
  const dpr = usePerformanceStore((state) => state.dpr);
  // const isDebug = useUIStore((state) => state.debugVisible);

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}>
      <Canvas
        dpr={dpr}
        gl={{ 
          antialias: true,
          powerPreference: "high-performance",
          alpha: false 
        }}
        camera={{ position: [0, 0, 5], fov: 45 }}
      >
        <RendererConfig />
        {/* {isDebug && <Perf position="top-left" />} */}
        {children}
      </Canvas>
    </div>
  );
};
