'use client';

import React from 'react';

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

/**
 * GlassPanel Component
 * Reusable container that implements the "Glass System" elevation 1.
 */
export function GlassPanel({ children, className = '', hoverable = false }: GlassPanelProps) {
  const baseClasses = 'glass-panel rounded-2xl overflow-hidden transition-all duration-300';
  const hoverClasses = hoverable ? 'glass-panel-hover cursor-pointer' : '';

  return (
    <div className={`${baseClasses} ${hoverClasses} ${className}`.trim()}>
      {children}
    </div>
  );
}
