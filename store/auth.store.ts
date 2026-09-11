import { api } from "@/lib/api";
import axios from "axios";
import { create } from "zustand";

type User = {
    email: string;
    id: string;
}

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error:  Error | null;

  setUser: (user: User | null) => void;
  setIsLoading: (value: boolean) => void;
  setError: (error: Error | null) => void;

  refreshUser: () => Promise<void>;
  signOut: () => Promise<void>;

};

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,

    setUser: (user) =>
    set({
        user,
        isAuthenticated: !!user,
    }),

    setIsLoading: (value) => set({ isLoading: value }),

    setError: (error) => set({ error }),

    refreshUser: async () => {
        try {
            set({ isLoading: true, error: null });

            const response = await api.get("/auth/me-admin");
            const profile = response.data.data;

            set({
                user: {
                    email: profile.email,
                    id: profile.id
                },
                isAuthenticated: true,
                error: null,
            });
        } catch (error) {
            if (
                axios.isAxiosError(error) &&
                error.response?.status === 401
            ) {
                set({
                    user: null,
                    isAuthenticated: false,
                    error: null,
                });

                return;
            }

                set({
                    user: null,
                    isAuthenticated: false,
                    error:
                        error instanceof Error
                        ? error
                        : new Error("Unable to load user profile"),
                });
        } finally {
            set({ isLoading: false });
        }
    },

    signOut: async () => {
        try {
            await api.post("/auth/logout-admin");
        } finally {
            set({
                user: null,
                isAuthenticated: false,
                error: null,
            });
        }
    },
}))