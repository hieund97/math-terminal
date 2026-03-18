'use client';

import { useEffect } from 'react';
import { useUIStore } from '@/stores/uiStore';
import { useProgressStore } from '@/stores/progressStore';

export function LevelUpBanner() {
  const { leveledUp, hideLevelUp } = useUIStore();
  const { level } = useProgressStore();

  useEffect(() => {
    if (leveledUp) {
      const timer = setTimeout(hideLevelUp, 3000);
      return () => clearTimeout(timer);
    }
  }, [leveledUp, hideLevelUp]);

  if (!leveledUp) return null;

  return (
    <div className="fixed inset-x-0 top-0 z-50 flex items-center justify-center px-4 py-3 sm:py-4 animate-slide-in-right">
      <div className="px-4 sm:px-8 py-2 sm:py-3 rounded-lg border border-neon-purple/50 bg-cyber-bg/95 backdrop-blur-md glow-border-purple">
        <div className="text-center">
          <div className="text-[10px] sm:text-xs text-neon-purple/60 uppercase tracking-[0.3em]">
            // SYSTEM UPGRADE
          </div>
          <div className="text-lg sm:text-2xl font-bold neon-text mt-1">
            LEVEL UP → LVL.{String(level).padStart(2, '0')}
          </div>
        </div>
      </div>
    </div>
  );
}
