'use client';

import { useEffect } from 'react';
import { useUIStore } from '@/stores/uiStore';

export function XPPopup() {
  const { showXPPopup, xpPopupAmount, hideXP } = useUIStore();

  useEffect(() => {
    if (showXPPopup) {
      const timer = setTimeout(hideXP, 1200);
      return () => clearTimeout(timer);
    }
  }, [showXPPopup, hideXP]);

  if (!showXPPopup) return null;

  const isPositive = xpPopupAmount > 0;

  return (
    <div className="fixed top-16 sm:top-24 right-3 sm:right-8 z-40 animate-float-up pointer-events-none">
      <span
        className={`text-lg sm:text-2xl font-bold font-mono ${isPositive ? 'text-neon-green neon-text-green' : 'text-neon-red'}`}
      >
        {isPositive ? '+' : ''}{xpPopupAmount} XP
      </span>
    </div>
  );
}
