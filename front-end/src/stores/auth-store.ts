import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AuthState, User } from '~/types/auth'

interface AuthStore extends AuthState {
  login: (user: User, token: string) => void
  logout: () => void
  setLoading: (loading: boolean) => void
  setUser: (user: User | null) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      
      login: (user: User, token: string) => 
        set({ 
          user, 
          token, 
          isAuthenticated: true, 
          isLoading: false 
        }),
      
      logout: () => 
        set({ 
          user: null, 
          token: null, 
          isAuthenticated: false, 
          isLoading: false 
        }),
      
      setLoading: (isLoading: boolean) => 
        set({ isLoading }),
      
      setUser: (user: User | null) => 
        set({ user, isAuthenticated: !!user }),
    }),
    {
      name: 'auth-storage', // localStorage key
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
)