import type { User } from "~/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
  accessToken?: string | null;
  refreshToken?: string | null;
  user?: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  actions: {
    setTokens: (tokens: { accessToken: string; refreshToken?: string }) => void;
    setUser: (user: User | null) => void;
    clearAuth: () => void;
    setLoading: (loading: boolean) => void;
  };
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,
      actions: {
        setTokens: ({ accessToken, refreshToken }) => {
          set({ accessToken, refreshToken: refreshToken ?? get().refreshToken, isAuthenticated: !!accessToken });
        },
        setUser: (user) => {
          set({ user });
        },
        clearAuth: () => {
          set({ accessToken: null, refreshToken: null, user: null, isAuthenticated: false, isLoading: false });
        },
        setLoading: (loading) => {
          set({ isLoading: loading });
        },
      },
    }),
    {
      name: "auth-storage", // Name of the item in localStorage
      storage: createJSONStorage(() => localStorage), // Use localStorage
      partialize: (state) => ({
        // Only persist tokens and user, not loading state or actions
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Export actions separately for easier usage in components/hooks
export const useAuthActions = () => useAuthStore((state) => state.actions);
