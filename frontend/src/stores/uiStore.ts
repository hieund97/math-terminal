'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  soundEnabled: boolean;
  sidebarOpen: boolean;
  showXPPopup: boolean;
  xpPopupAmount: number;
  leveledUp: boolean;
  toggleSound: () => void;
  toggleSidebar: () => void;
  showXP: (amount: number) => void;
  hideXP: () => void;
  triggerLevelUp: () => void;
  hideLevelUp: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      soundEnabled: false,
      sidebarOpen: false,
      showXPPopup: false,
      xpPopupAmount: 0,
      leveledUp: false,

      toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      showXP: (amount) => set({ showXPPopup: true, xpPopupAmount: amount }),
      hideXP: () => set({ showXPPopup: false }),
      triggerLevelUp: () => set({ leveledUp: true }),
      hideLevelUp: () => set({ leveledUp: false }),
    }),
    {
      name: 'math-terminal-ui',
      partialize: (state) => ({ soundEnabled: state.soundEnabled }),
    },
  ),
);
