import { Box, Typography, Button, Card, CardContent } from '@mui/material'
import { useAuth } from '~/hooks/useAuth'

export function DashboardPage() {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          House Inventory Dashboard
        </Typography>
        <Button variant="outlined" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Welcome back, {user?.name}!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Your house inventory app is ready to use. Start by adding items to your inventory.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}