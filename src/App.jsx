// ====================================================================
// FILE: App.jsx
// LOCATION: /src/App.jsx
// PURPOSE: Main application component and routing configuration
// DESCRIPTION: Root component that handles navigation, auth routing, and layout
// ====================================================================

// React core import for component functionality
import React from "react";
// React Router imports for client-side routing and navigation
import { Routes, Route, useLocation } from "react-router-dom";
// Application components imports
import Navbar from "./Navbar"; // Main navigation component
import Home from "./pages/Home"; // Home page component
import SavedListings from "./SavedListings"; // User's saved properties component
import Settings from "./pages/Settings"; // User settings page component
// Authentication components from Clerk integration
import { SignInPage, SignUpPage, ProtectedRoute } from "./ClerkAuth";

// ====================================================================
// MAIN APPLICATION COMPONENT: App
// PURPOSE: Root component that orchestrates the entire application
// LOCATION: Entry point for the React application
// ====================================================================
function App() {
    // ================================================================
    // ROUTING HOOKS SECTION
    // LOCATION: Top of App component
    // PURPOSE: Access current route information for conditional rendering
    // ================================================================

    // React Router hook to get current location/path information
    const location = useLocation();

    // ================================================================
    // UTILITY FUNCTIONS SECTION
    // LOCATION: After hooks in App component
    // PURPOSE: Helper functions for route-based logic
    // ================================================================

    // Function: Determine current page identifier from URL path
    // PURPOSE: Convert URL paths to readable page identifiers for navbar state
    // RETURNS: String identifier for current page
    const getCurrentPage = () => {
        // Switch statement to map URL paths to page identifiers
        switch(location.pathname) {
            case '/saved':
                return 'saved'; // Saved listings page
            case '/settings':
                return 'settings'; // User settings page
            case '/sign-in':
                return 'signin'; // Sign-in authentication page
            case '/sign-up':
                return 'signup'; // Sign-up registration page
            case '/':
            default:
                return 'home'; // Home page (default fallback)
        }
    };

    // ================================================================
    // CONDITIONAL RENDERING LOGIC
    // LOCATION: After utility functions in App component
    // PURPOSE: Determine which UI elements to show based on current route
    // ================================================================

    // Condition: Hide navbar on authentication pages for cleaner UX
    // LOGIC: Check if current path includes sign-in or sign-up routes
    const showNavbar = !location.pathname.includes('/sign-in') && !location.pathname.includes('/sign-up');

    // ================================================================
    // COMPONENT RENDER SECTION
    // LOCATION: Main return statement of App component
    // ================================================================
    return (
        // ============================================================
        // ROOT CONTAINER: Main application wrapper
        // PURPOSE: Contains all application content and layout
        // ============================================================
        <div>
            {/* ========================================================
                CONDITIONAL NAVBAR: Show navigation except on auth pages
                LOGIC: Only render navbar when showNavbar is true
                ======================================================== */}
            {showNavbar && <Navbar currentPage={getCurrentPage()} />}

            {/* ========================================================
                MAIN CONTENT AREA: Container for page content
                STYLING: Conditional padding based on navbar presence
                PURPOSE: Holds all routed page components
                ======================================================== */}
            <main className={showNavbar ? "pt-20 px-4" : ""}>

                {/* ====================================================
                    ROUTING CONFIGURATION: React Router route definitions
                    LOCATION: Inside main content area
                    PURPOSE: Define all application routes and their components
                    ==================================================== */}
                <Routes>

                    {/* ================================================
                        PUBLIC ROUTES SECTION
                        PURPOSE: Routes accessible without authentication
                        LOCATION: Top of Routes configuration
                        ================================================ */}

                    {/* Route: Home page - Main landing and search interface */}
                    <Route path="/" element={<Home />} />

                    {/* Route: Sign-in page - User authentication login */}
                    <Route path="/sign-in" element={<SignInPage />} />

                    {/* Route: Sign-up page - User registration */}
                    <Route path="/sign-up" element={<SignUpPage />} />

                    {/* ================================================
                        PROTECTED ROUTES SECTION
                        PURPOSE: Routes requiring user authentication
                        LOCATION: After public routes in Routes configuration
                        WRAPPER: ProtectedRoute component handles auth validation
                        ================================================ */}

                    {/* Protected Route: Saved listings page */}
                    {/* PURPOSE: Display user's saved/bookmarked properties */}
                    <Route
                        path="/saved"
                        element={
                            <ProtectedRoute>
                                <SavedListings />
                            </ProtectedRoute>
                        }
                    />

                    {/* Protected Route: Settings page */}
                    {/* PURPOSE: User account and preference management */}
                    <Route
                        path="/settings"
                        element={
                            <ProtectedRoute>
                                <Settings />
                            </ProtectedRoute>
                        }
                    />

                </Routes> {/* End of routing configuration */}
            </main> {/* End of main content area */}
        </div> // End of root container
    );
} // End of App component function

// ====================================================================
// COMPONENT EXPORT
// PURPOSE: Make App component available as default export
// USAGE: Imported and rendered in main.jsx as root component
// ====================================================================
export default App;
