import { create } from "zustand";

type Theme = "light" | "dark" | "system";

interface AppStore {
  sidebarOpen: boolean;
  mobileMenuOpen: boolean;
  theme: Theme;
  isPageLoading: boolean;

  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;

  setMobileMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;

  setTheme: (theme: Theme) => void;

  setIsPageLoading: (loading: boolean) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  sidebarOpen: true,
  mobileMenuOpen: false,
  theme: "system",
  isPageLoading: false,

  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  toggleSidebar: () =>
    set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  setMobileMenuOpen: (mobileMenuOpen) => set({ mobileMenuOpen }),
  toggleMobileMenu: () =>
    set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),

  setTheme: (theme) => set({ theme }),

  setIsPageLoading: (isPageLoading) => set({ isPageLoading }),
}));