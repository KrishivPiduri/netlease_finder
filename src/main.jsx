// ====================================================================
// FILE: main.jsx
// LOCATION: /src/main.jsx
// PURPOSE: Application entry point and root component setup
// DESCRIPTION: Configures React app with routing, authentication, and context providers
// ====================================================================

// React core imports for strict mode and DOM rendering
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// React Router import for client-side routing functionality
import { BrowserRouter } from 'react-router-dom'
// Global CSS styles import
import './index.css'
// Main application component import
import App from './App.jsx'
// Custom context providers for application state management
import { UserProvider } from './UserContext'; // User state and settings management
import { ClerkAuthProvider } from './ClerkAuth'; // Authentication provider wrapper

// ====================================================================
// APPLICATION BOOTSTRAP SECTION
// LOCATION: Main execution of main.jsx
// PURPOSE: Initialize React application with all necessary providers
// ====================================================================

// Create React root and render application with provider hierarchy
createRoot(document.getElementById('root')).render(
  // ==================================================================
  // REACT STRICT MODE: Development mode wrapper for additional checks
  // PURPOSE: Enables extra development warnings and double-rendering
  // ==================================================================
  <StrictMode>

    {/* ================================================================
        BROWSER ROUTER: Client-side routing provider
        PURPOSE: Enables React Router navigation throughout the app
        LOCATION: Outermost routing context
        ================================================================ */}
    <BrowserRouter>

      {/* ==============================================================
          CLERK AUTH PROVIDER: Authentication context provider
          PURPOSE: Provides Clerk authentication state to entire app
          LOCATION: Wraps user context and app components
          ============================================================== */}
      <ClerkAuthProvider>

        {/* ============================================================
            USER PROVIDER: Application user state context provider
            PURPOSE: Provides user data, settings, and saved properties
            LOCATION: Wraps main App component
            DEPENDENCIES: Requires ClerkAuthProvider for user data
            ============================================================ */}
        <UserProvider>

          {/* ========================================================
              MAIN APP COMPONENT: Root application component
              PURPOSE: Contains all routing and page components
              LOCATION: Innermost component with access to all contexts
              ======================================================== */}
          <App />

        </UserProvider> {/* End of user context provider */}
      </ClerkAuthProvider> {/* End of authentication provider */}
    </BrowserRouter> {/* End of router provider */}
  </StrictMode>, // End of strict mode wrapper
)
