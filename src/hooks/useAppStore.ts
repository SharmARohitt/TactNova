import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { User, Theme } from '../types';

interface AppState {
  // Theme
  theme: Theme;
  setTheme: (theme: Theme) => void;

  // User
  user: User | null;
  setUser: (user: User | null) => void;

  // UI State
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;

  // Mobile menu
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;

  // Modals
  isModalOpen: boolean;
  modalType: string | null;
  openModal: (type: string) => void;
  closeModal: () => void;

  // Notifications
  notifications: Array<{
    id: string;
    title: string;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    timestamp: Date;
  }>;
  addNotification: (notification: Omit<AppState['notifications'][0], 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        // Theme
        theme: 'dark',
        setTheme: (theme) => set({ theme }),

        // User
        user: null,
        setUser: (user) => set({ user }),

        // UI State
        isLoading: false,
        setIsLoading: (isLoading) => set({ isLoading }),

        // Mobile menu
        isMobileMenuOpen: false,
        setIsMobileMenuOpen: (isMobileMenuOpen) => set({ isMobileMenuOpen }),

        // Modals
        isModalOpen: false,
        modalType: null,
        openModal: (type) => set({ isModalOpen: true, modalType: type }),
        closeModal: () => set({ isModalOpen: false, modalType: null }),

        // Notifications
        notifications: [],
        addNotification: (notification) => {
          const id = Math.random().toString(36).substr(2, 9);
          const newNotification = {
            ...notification,
            id,
            timestamp: new Date(),
          };
          set((state) => ({
            notifications: [newNotification, ...state.notifications].slice(0, 10), // Keep only last 10
          }));
        },
        removeNotification: (id) => {
          set((state) => ({
            notifications: state.notifications.filter((n) => n.id !== id),
          }));
        },
        clearNotifications: () => set({ notifications: [] }),
      }),
      {
        name: 'tactnova-app-store',
        partialize: (state) => ({
          theme: state.theme,
          user: state.user,
        }),
      }
    ),
    { name: 'TactnovaAppStore' }
  )
);
