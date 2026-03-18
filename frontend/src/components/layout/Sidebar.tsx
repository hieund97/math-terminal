'use client';

import { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { SUBJECTS } from '@/lib/constants';
import { useQuizStore } from '@/stores/quizStore';
import { useUIStore } from '@/stores/uiStore';

export function Sidebar() {
  const { activeSubject, loadQuestions, loading } = useQuizStore();
  const { sidebarOpen, toggleSidebar } = useUIStore();

  // Close sidebar on mobile after selecting a subject
  const handleSelect = (subjectName: string) => {
    if (loading) return;
    loadQuestions(subjectName);
    // Close on mobile
    if (window.innerWidth < 768) {
      toggleSidebar();
    }
  };

  // Close sidebar on escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && sidebarOpen) toggleSidebar();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [sidebarOpen, toggleSidebar]);

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'flex flex-col border-r border-cyber-border bg-cyber-surface/95 backdrop-blur-md',
          // Mobile: fixed overlay, slides in from left
          'fixed inset-y-0 left-0 z-40 w-64 transition-transform duration-300 ease-out',
          'md:static md:z-auto md:w-60 md:translate-x-0 md:bg-cyber-surface/40 md:backdrop-blur-none',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        {/* Header */}
        <div className="p-4 border-b border-cyber-border flex items-center justify-between">
          <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            // Modules
          </h2>
          <button
            onClick={toggleSidebar}
            className="md:hidden w-7 h-7 flex items-center justify-center rounded border border-cyber-border hover:border-neon-purple/50 transition-colors text-xs"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          {SUBJECTS.map((subject, i) => {
            const isActive = activeSubject === subject.name;
            return (
              <button
                key={subject.id}
                onClick={() => handleSelect(subject.name)}
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

        {/* Footer */}
        <div className="p-4 border-t border-cyber-border">
          <div className="text-[10px] text-muted-foreground/50 font-mono">
            <div>SYS.STATUS: ONLINE</div>
            <div>PROTOCOL: v2.4.1</div>
          </div>
        </div>
      </aside>
    </>
  );
}
