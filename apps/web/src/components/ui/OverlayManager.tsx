'use client';


import { useState } from 'react';
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
  const [cartCount, setCartCount] = useState(0);

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
        {['WORLD', 'DETAIL', 'CUSTOMIZATION', 'CART', 'CHECKOUT'].includes(currentState) && (
          <nav className="pointer-events-auto flex gap-4">
            <Button variant="ghost" onClick={() => experienceEngine.transitionTo('WORLD')}>Collections</Button>
            <Button variant="ghost">About</Button>
            <Button variant="secondary" onClick={() => experienceEngine.transitionTo('CART')}>
              Cart ({cartCount})
            </Button>
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
                <Button variant="secondary" className="flex-1" onClick={() => {
                  setCartCount(prev => prev + 1);
                  experienceEngine.transitionTo('CART');
                }}>Add to Cart</Button>
              </div>
            </GlassPanel>
          </div>
        )}

        {/* CART STATE */}
        {currentState === 'CART' && (
          <div className="absolute right-12 top-24 bottom-24 pointer-events-auto flex flex-col justify-center">
            <GlassPanel className="p-8 w-96 max-h-full flex flex-col">
              <Typography variant="h2" className="mb-6">Your Cart</Typography>
              
              {cartCount === 0 ? (
                <div className="flex-1 flex items-center justify-center">
                  <Typography variant="body" className="opacity-50">Your cart is empty.</Typography>
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto space-y-6">
                  {Array.from({ length: cartCount }).map((_, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-white/10 pb-4">
                      <div>
                        <Typography variant="body" className="font-bold">Quantum Jacket</Typography>
                        <Typography variant="caption" className="opacity-70">AERIS DROP 01</Typography>
                      </div>
                      <Typography variant="body">$450</Typography>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-6 border-t border-white/10 mt-auto">
                <div className="flex justify-between items-center mb-6">
                  <Typography variant="h3">Total</Typography>
                  <Typography variant="h3">${cartCount * 450}</Typography>
                </div>
                <Button 
                  className="w-full" 
                  disabled={cartCount === 0}
                  onClick={() => experienceEngine.transitionTo('CHECKOUT')}
                >
                  Proceed to Checkout
                </Button>
              </div>
            </GlassPanel>
          </div>
        )}

        {/* CHECKOUT STATE */}
        {currentState === 'CHECKOUT' && (
          <div className="text-center pointer-events-auto w-full max-w-md mx-auto">
            <GlassPanel className="p-8 text-left">
              <Typography variant="h2" className="mb-8">Secure Checkout</Typography>
              
              <div className="space-y-4 mb-8">
                <div>
                  <Typography variant="label" className="block mb-2">Email Address</Typography>
                  <input type="email" className="w-full bg-white/5 border border-white/10 rounded p-3 text-white focus:outline-none focus:border-accent" placeholder="you@example.com" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Typography variant="label" className="block mb-2">First Name</Typography>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded p-3 text-white focus:outline-none focus:border-accent" placeholder="John" />
                  </div>
                  <div>
                    <Typography variant="label" className="block mb-2">Last Name</Typography>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded p-3 text-white focus:outline-none focus:border-accent" placeholder="Doe" />
                  </div>
                </div>
              </div>

              <Button className="w-full" onClick={() => {
                setCartCount(0);
                experienceEngine.transitionTo('OUTRO');
              }}>
                Complete Purchase
              </Button>
            </GlassPanel>
          </div>
        )}

        {/* OUTRO STATE */}
        {currentState === 'OUTRO' && (
          <div className="text-center pointer-events-auto">
            <Typography variant="display-xl" className="mb-6 text-accent">Order Confirmed</Typography>
            <Typography variant="body-lg" className="mb-12">
              Welcome to the future. Your Quantum Jacket is being prepared.
            </Typography>
            <Button onClick={() => experienceEngine.transitionTo('WORLD')} variant="secondary">
              Return to Universe
            </Button>
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
