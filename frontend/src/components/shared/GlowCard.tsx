'use client';

import { cn } from '@/lib/utils';

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: 'purple' | 'blue' | 'green' | 'yellow' | 'red';
}

export function GlowCard({ children, className, glow = 'purple' }: GlowCardProps) {
  const glowClass = {
    purple: 'glow-border-purple',
    blue: 'glow-border-blue',
    green: 'glow-border-green',
    yellow: 'glow-border-yellow',
    red: 'glow-border-red',
  }[glow];

  return (
    <div
      className={cn(
        'glow-card p-4 transition-all duration-300',
        glowClass,
        className,
      )}
    >
      {children}
    </div>
  );
}
