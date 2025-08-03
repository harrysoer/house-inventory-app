import { createBrowserRouter, Navigate } from 'react-router-dom'
import { ProtectedRoute } from '~/components/common/ProtectedRoute'
import { PublicRoute } from '~/components/common/PublicRoute'
import { LoginPage } from '~/pages/LoginPage'
import { DashboardPage } from '~/pages/DashboardPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: '/login',
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />,
  },
])