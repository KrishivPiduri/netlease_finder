import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './UserContext';
import { ClerkAuthProvider } from './ClerkAuth';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ClerkAuthProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </ClerkAuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
