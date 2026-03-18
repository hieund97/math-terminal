'use client';

import { useProgressStore } from '@/stores/progressStore';
import { useUIStore } from '@/stores/uiStore';
import { XP_PER_LEVEL } from '@/lib/constants';
import { NeonText } from '@/components/shared/NeonText';

export function StatusBar() {
  const { xp, level, streak } = useProgressStore();
  const { soundEnabled, toggleSound, toggleSidebar } = useUIStore();

  const currentLevelXP = xp % XP_PER_LEVEL;
  const progressPercent = (currentLevelXP / XP_PER_LEVEL) * 100;

  return (
    <header className="flex items-center justify-between px-3 sm:px-6 h-14 sm:h-16 border-b border-cyber-border bg-cyber-surface/60 backdrop-blur-sm">
      {/* Left: hamburger + title */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={toggleSidebar}
          className="md:hidden w-8 h-8 flex items-center justify-center rounded border border-cyber-border hover:border-neon-purple/50 transition-colors text-sm"
          aria-label="Toggle menu"
        >
          ☰
        </button>
        <NeonText className="text-sm sm:text-lg tracking-[0.15em] sm:tracking-[0.2em]">
          MATH//TERMINAL
        </NeonText>
        <span className="text-xs text-muted-foreground hidden sm:inline">v1.0</span>
      </div>

      {/* Right: level, XP, streak, sound */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Level + XP bar */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          <span className="text-neon-blue font-bold text-xs sm:text-sm">
            LVL.{String(level).padStart(2, '0')}
          </span>
          <div className="w-16 sm:w-32 h-1.5 sm:h-2 bg-cyber-border rounded-full overflow-hidden relative">
            <div
              className="h-full rounded-full bg-linear-to-r from-neon-purple to-neon-blue transition-all duration-700 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
            <div
              className="absolute top-0 h-full rounded-full bg-white/20 blur-sm transition-all duration-700 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-[10px] sm:text-xs text-muted-foreground tabular-nums hidden sm:inline">
            {currentLevelXP}/{XP_PER_LEVEL}
          </span>
        </div>

        {/* Streak */}
        {streak > 0 && (
          <div className="flex items-center gap-0.5 text-neon-yellow text-xs sm:text-sm font-bold">
            <span>🔥</span>
            <span>x{streak}</span>
          </div>
        )}

        {/* Total XP — hidden on small mobile */}
        <span className="text-[10px] sm:text-xs text-muted-foreground tabular-nums hidden xs:inline">
          {xp} XP
        </span>

        {/* Sound Toggle */}
        <button
          onClick={toggleSound}
          className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded border border-cyber-border hover:border-neon-purple/50 transition-colors text-xs sm:text-sm"
          title={soundEnabled ? 'Mute' : 'Unmute'}
        >
          {soundEnabled ? '🔊' : '🔇'}
        </button>
      </div>
    </header>
  );
}
