'use client';

import { cn } from '@/lib/utils';
import { SUBJECTS } from '@/lib/constants';
import { useQuizStore } from '@/stores/quizStore';

export function Sidebar() {
  const { activeSubject, loadQuestions, loading } = useQuizStore();

  return (
    <aside className="w-60 border-r border-cyber-border bg-cyber-surface/40 flex flex-col">
      <div className="p-4 border-b border-cyber-border">
        <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          // Modules
        </h2>
      </div>

      <nav className="flex-1 p-2 space-y-1">
        {SUBJECTS.map((subject, i) => {
          const isActive = activeSubject === subject.name;
          return (
            <button
              key={subject.id}
              onClick={() => !loading && loadQuestions(subject.name)}
              disabled={loading}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 text-left',
                'hover:bg-neon-purple/10 hover:translate-x-1',
                isActive
                  ? 'bg-neon-purple/15 text-neon-purple border-l-2 border-neon-purple glow-border-purple'
                  : 'text-muted-foreground border-l-2 border-transparent hover:text-foreground',
              )}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <span className="text-lg w-6 text-center">{subject.icon}</span>
              <span>{subject.name}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-cyber-border">
        <div className="text-[10px] text-muted-foreground/50 font-mono">
          <div>SYS.STATUS: ONLINE</div>
          <div>PROTOCOL: v2.4.1</div>
        </div>
      </div>
    </aside>
  );
}
