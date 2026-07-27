'use client';

import React from 'react';

type TypographyVariant = 'display-xxl' | 'display-xl' | 'h1' | 'h2' | 'h3' | 'body-lg' | 'body' | 'caption' | 'label';

interface TypographyProps {
  variant?: TypographyVariant;
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType<any>;
}

const variantStyles: Record<TypographyVariant, string> = {
  'display-xxl': 'text-6xl md:text-8xl font-light tracking-tighter leading-none',
  'display-xl': 'text-5xl md:text-7xl font-light tracking-tight leading-tight',
  h1: 'text-4xl md:text-5xl font-medium tracking-tight',
  h2: 'text-3xl md:text-4xl font-medium tracking-tight',
  h3: 'text-2xl md:text-3xl font-medium',
  'body-lg': 'text-lg md:text-xl font-normal leading-relaxed text-text-secondary',
  body: 'text-base font-normal leading-relaxed text-text-secondary',
  caption: 'text-sm font-light text-text-secondary tracking-wide',
  label: 'text-xs font-mono tracking-widest uppercase text-text-secondary',
};

const defaultTags: Record<TypographyVariant, React.ElementType<any>> = {
  'display-xxl': 'h1',
  'display-xl': 'h1',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  'body-lg': 'p',
  body: 'p',
  caption: 'span',
  label: 'span',
};

/**
 * Typography Component
 * Enforces the strict scaling and font weight rules.
 */
export function Typography({ variant = 'body', children, className = '', as }: TypographyProps) {
  const Component = (as || defaultTags[variant]) as any;
  const styles = variantStyles[variant];

  return <Component className={`${styles} ${className}`.trim()}>{children}</Component>;
}
