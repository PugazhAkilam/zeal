import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeContextProvider } from './theme/ThemeContext'
import { AuthProvider } from './context/AuthContext';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <ThemeContextProvider>
      <App />
    </ThemeContextProvider></AuthProvider>
  </StrictMode>,
)
