import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material'
import { router } from '~/utils/router'
import { store } from '~/stores'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
})

export function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ minWidth: '100vw', minHeight: '100vh' }}>
          <RouterProvider router={router} />
        </Box>
      </ThemeProvider>
    </Provider>
  )
}

export default App
