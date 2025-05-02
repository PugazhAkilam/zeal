import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app.jsx'
import { ThemeContextProvider } from './theme/ThemeContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <ThemeContextProvider>
      <App />
    </ThemeContextProvider>
  </StrictMode>,
)
