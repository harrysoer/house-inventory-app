import { useAuthStore } from '~/stores/auth-store'
import { useLoginMutation, useLogoutMutation } from '~/api/auth-api'
import type { LoginCredentials } from '~/types/auth'

export function useAuth() {
  const { 
    user, 
    token, 
    isAuthenticated, 
    isLoading, 
    login: setAuthData, 
    logout: clearAuthData, 
    setLoading 
  } = useAuthStore()

  const [loginMutation] = useLoginMutation()
  const [logoutMutation] = useLogoutMutation()

  const login = async (credentials: LoginCredentials) => {
    try {
      setLoading(true)
      const result = await loginMutation(credentials).unwrap()
      setAuthData(result.user, result.token)
      return { success: true, data: result }
    } catch (error) {
      setLoading(false)
      return { success: false, error }
    }
  }

  const logout = async () => {
    try {
      setLoading(true)
      await logoutMutation().unwrap()
      clearAuthData()
    } catch {
      // Even if logout fails on server, clear local state
      clearAuthData()
    }
  }

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    logout,
  }
}