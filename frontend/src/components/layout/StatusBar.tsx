'use client';

import { useProgressStore } from '@/stores/progressStore';
import { useUIStore } from '@/stores/uiStore';
import { XP_PER_LEVEL } from '@/lib/constants';
import { NeonText } from '@/components/shared/NeonText';

export function StatusBar() {
  const { xp, level, streak } = useProgressStore();
  const { soundEnabled, toggleSound } = useUIStore();

  const currentLevelXP = xp % XP_PER_LEVEL;
  const progressPercent = (currentLevelXP / XP_PER_LEVEL) * 100;

  return (
    <header className="flex items-center justify-between px-6 h-16 border-b border-cyber-border bg-cyber-surface/60 backdrop-blur-sm">
      {/* Title */}
      <div className="flex items-center gap-3">
        <NeonText className="text-lg tracking-[0.2em]">
          MATH//TERMINAL
        </NeonText>
        <span className="text-xs text-muted-foreground hidden sm:inline">v1.0</span>
      </div>

      {/* Level & XP Bar */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <span className="text-neon-blue font-bold text-sm">
            LVL.{String(level).padStart(2, '0')}
          </span>
          <div className="w-32 h-2 bg-cyber-border rounded-full overflow-hidden relative">
            <div
              className="h-full rounded-full bg-gradient-to-r from-neon-purple to-neon-blue transition-all duration-700 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
            <div
              className="absolute top-0 h-full rounded-full bg-white/20 blur-sm transition-all duration-700 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground tabular-nums">
            {currentLevelXP}/{XP_PER_LEVEL}
          </span>
        </div>

        {/* Streak */}
        {streak > 0 && (
          <div className="flex items-center gap-1 text-neon-yellow text-sm font-bold">
            <span className="text-base">🔥</span>
            <span>x{streak}</span>
          </div>
        )}

        {/* Total XP */}
        <span className="text-xs text-muted-foreground tabular-nums">
          {xp} XP
        </span>

        {/* Sound Toggle */}
        <button
          onClick={toggleSound}
          className="w-8 h-8 flex items-center justify-center rounded border border-cyber-border hover:border-neon-purple/50 transition-colors text-sm"
          title={soundEnabled ? 'Mute' : 'Unmute'}
        >
          {soundEnabled ? '🔊' : '🔇'}
        </button>
      </div>
    </header>
  );
}
