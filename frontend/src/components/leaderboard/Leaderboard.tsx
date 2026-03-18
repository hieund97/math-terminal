'use client';

import { cn } from '@/lib/utils';
import { leaderboardData } from '@/lib/mock-leaderboard';
import { useProgressStore } from '@/stores/progressStore';
import { NeonText } from '@/components/shared/NeonText';

const rankColors: Record<number, string> = {
  1: 'text-yellow-400 border-yellow-400/30',
  2: 'text-gray-300 border-gray-300/30',
  3: 'text-orange-400 border-orange-400/30',
};

export function Leaderboard() {
  const { xp, level } = useProgressStore();

  return (
    <div className="space-y-4">
      <NeonText as="h2" className="text-xs tracking-[0.2em]">
        // RANKINGS
      </NeonText>

      <div className="space-y-1.5">
        {leaderboardData.map((entry) => {
          const special = rankColors[entry.rank];
          return (
            <div
              key={entry.rank}
              className={cn(
                'flex items-center gap-2 p-2 rounded-lg border text-xs transition-all duration-200',
                special
                  ? `border-opacity-20 ${special} bg-current/5`
                  : 'border-cyber-border text-muted-foreground',
              )}
              style={
                special
                  ? {
                      backgroundColor:
                        entry.rank === 1
                          ? 'rgba(250,204,21,0.05)'
                          : entry.rank === 2
                            ? 'rgba(209,213,219,0.05)'
                            : 'rgba(251,146,60,0.05)',
                    }
                  : undefined
              }
            >
              <span className="w-5 text-center font-bold tabular-nums">
                {entry.rank}
              </span>
              <span className="text-base">{entry.avatar}</span>
              <span className="flex-1 font-mono truncate">{entry.name}</span>
              <span className="tabular-nums text-muted-foreground">
                {(entry.xp / 1000).toFixed(1)}k
              </span>
            </div>
          );
        })}

        {/* Current user */}
        <div className="flex items-center gap-2 p-2 rounded-lg border border-neon-purple/30 bg-neon-purple/5 text-xs mt-3">
          <span className="w-5 text-center font-bold text-neon-purple tabular-nums">
            —
          </span>
          <span className="text-base">🎮</span>
          <span className="flex-1 font-mono text-neon-purple font-bold">YOU</span>
          <span className="tabular-nums text-neon-purple">
            {xp} XP
          </span>
        </div>
      </div>

      {/* Achievements */}
      <div className="space-y-3 mt-6">
        <NeonText as="h2" className="text-xs tracking-[0.2em]" color="green">
          // ACHIEVEMENTS
        </NeonText>
        <AchievementList />
      </div>
    </div>
  );
}

function AchievementList() {
  const { totalAnswered, totalCorrect, streak, level } = useProgressStore();

  const achievements = [
    { name: 'First Blood', desc: 'Answer 1 question', unlocked: totalAnswered >= 1, icon: '🩸' },
    { name: 'Streak x5', desc: '5 correct in a row', unlocked: streak >= 5, icon: '🔥' },
    { name: 'Level Up', desc: 'Reach Level 2', unlocked: level >= 2, icon: '⬆️' },
    { name: 'Sharp Mind', desc: '10 correct answers', unlocked: totalCorrect >= 10, icon: '🧠' },
  ];

  return (
    <div className="grid grid-cols-2 gap-2">
      {achievements.map((a) => (
        <div
          key={a.name}
          className={cn(
            'p-2 rounded-lg border text-center text-[10px] transition-all duration-200',
            a.unlocked
              ? 'border-neon-green/30 bg-neon-green/5 text-neon-green'
              : 'border-cyber-border bg-cyber-surface/50 text-muted-foreground/40',
          )}
        >
          <div className={cn('text-lg', !a.unlocked && 'grayscale opacity-30')}>
            {a.icon}
          </div>
          <div className="font-bold mt-0.5">{a.name}</div>
        </div>
      ))}
    </div>
  );
}
