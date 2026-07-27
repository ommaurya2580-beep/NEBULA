'use client';


import { useExperienceStore } from '@/store/useExperienceStore';
import { Typography } from './Typography';
import { Button } from './Button';
import { GlassPanel } from './GlassPanel';
import { experienceEngine } from '@/engine/ExperienceEngine';

/**
 * OverlayManager
 * Sits directly on top of the WebGL canvas.
 * Transitions UI states based on the Experience Engine 12-state machine.
 */
export function OverlayManager() {
  const { currentState } = useExperienceStore();

  const handleStartExperience = () => {
    // Command the engine to move from BOOT/INTRO to WORLD
    experienceEngine.transitionTo('WORLD');
  };

  const handleEnterWorld = () => {
    experienceEngine.transitionTo('WORLD');
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-8 md:p-12">
      
      {/* HEADER NAVIGATION - Hidden in BOOT */}
      <header className={`flex justify-between items-center transition-opacity duration-1000 ${currentState === 'BOOT' ? 'opacity-0' : 'opacity-100'}`}>
        <Typography variant="label" className="tracking-[0.2em]">NEBULA</Typography>
        
        {/* Only show menu in later states */}
        {['WORLD', 'DETAIL', 'CUSTOMIZATION', 'CHECKOUT'].includes(currentState) && (
          <nav className="pointer-events-auto flex gap-4">
            <Button variant="ghost">Collections</Button>
            <Button variant="ghost">About</Button>
            <Button variant="secondary">Cart (0)</Button>
          </nav>
        )}
      </header>

      {/* CENTER STAGE */}
      <main className="flex-1 flex flex-col items-center justify-center">
        
        {/* BOOT / INTRO STATE */}
        {(currentState === 'BOOT' || currentState === 'INTRO') && (
          <div className="text-center pointer-events-auto animate-pulse">
            <Typography variant="h3" className="mb-8">Initializing Universe...</Typography>
            <Button onClick={handleStartExperience} variant="primary">Enter Nebula</Button>
          </div>
        )}

        {/* BRAND STATE */}
        {currentState === 'BRAND' && (
          <div className="text-center max-w-2xl pointer-events-auto">
            <Typography variant="display-xl" className="mb-6">The Future of Form.</Typography>
            <Typography variant="body-lg" className="mb-12">
              We don't just design objects. We choreograph experiences. Every material, every reflection, every interaction is crafted for immersion.
            </Typography>
            <Button onClick={handleEnterWorld} variant="secondary">Explore Collection</Button>
          </div>
        )}

        {/* WORLD STATE (Minimal UI, let the 3D shine) */}
        {currentState === 'WORLD' && (
          <div className="absolute bottom-12 right-12 pointer-events-auto">
            <GlassPanel className="p-6 w-80">
              <Typography variant="label" className="block mb-2 text-accent">Active Collection</Typography>
              <Typography variant="h3" className="mb-4">AERIS DROP 01</Typography>
              <Typography variant="body" className="mb-6">Engineered for zero gravity. Drag to explore.</Typography>
              <Button onClick={() => experienceEngine.transitionTo('DETAIL')} className="w-full">View Details</Button>
            </GlassPanel>
          </div>
        )}

        {/* DETAIL STATE */}
        {currentState === 'DETAIL' && (
          <div className="absolute left-12 top-1/2 -translate-y-1/2 pointer-events-auto">
            <GlassPanel className="p-8 w-96">
              <Typography variant="label" className="block mb-2">01 / AERIS</Typography>
              <Typography variant="h2" className="mb-4">Quantum Jacket</Typography>
              <Typography variant="h3" className="mb-6 opacity-70">$450</Typography>
              
              <div className="space-y-4 mb-8">
                <Typography variant="body">Material: Adaptive Smart-Fabric</Typography>
                <Typography variant="body">Weight: 140g</Typography>
              </div>

              <div className="flex gap-4">
                <Button className="flex-1" onClick={() => experienceEngine.transitionTo('CUSTOMIZATION')}>Customize</Button>
                <Button variant="secondary" className="flex-1">Add to Cart</Button>
              </div>
            </GlassPanel>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className={`flex justify-between items-center transition-opacity duration-1000 ${currentState === 'BOOT' ? 'opacity-0' : 'opacity-100'}`}>
        <Typography variant="caption">© 2026 Nebula Systems</Typography>
        <Typography variant="caption" className="uppercase tracking-widest text-accent">
          {currentState.replace('_', ' ')}
        </Typography>
      </footer>
    </div>
  );
}
