import { Navigate } from 'react-router-dom'
import { useAuth } from '~/hooks/useAuth'

interface PublicRouteProps {
  children: React.ReactNode
  redirectTo?: string
}

export function PublicRoute({ children, redirectTo = '/dashboard' }: PublicRouteProps) {
  const { isAuthenticated } = useAuth()

  // Redirect authenticated users away from public pages (like login)
  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />
  }

  // Render public content for non-authenticated users
  return <>{children}</>
}