'use client';

import { StatusBar } from './StatusBar';
import { Sidebar } from './Sidebar';

interface DashboardShellProps {
  children: React.ReactNode;
  rightPanel?: React.ReactNode;
}

export function DashboardShell({ children, rightPanel }: DashboardShellProps) {
  return (
    <div className="h-screen flex flex-col overflow-hidden cyber-grid-bg">
      <StatusBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
        {rightPanel && (
          <aside className="w-72 border-l border-cyber-border bg-cyber-surface/40 overflow-y-auto p-4 hidden lg:block">
            {rightPanel}
          </aside>
        )}
      </div>
      {/* Scanline overlay */}
      <div className="scanline" />
    </div>
  );
}
