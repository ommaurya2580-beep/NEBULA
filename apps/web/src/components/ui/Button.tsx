'use client';

import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'icon';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-white text-black hover:bg-gray-200 border border-transparent font-medium px-6 py-3',
  secondary: 'glass-panel glass-panel-hover text-white font-medium px-6 py-3',
  ghost: 'bg-transparent text-white hover:text-accent font-medium px-4 py-2 border border-transparent',
  icon: 'glass-panel glass-panel-hover text-white rounded-full p-3 flex items-center justify-center w-12 h-12',
};

/**
 * Button Component
 * Reusable interactive component conforming to the design system.
 */
export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-black';
  const styles = variantStyles[variant];

  return (
    <button className={`${baseClasses} ${styles} ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}
