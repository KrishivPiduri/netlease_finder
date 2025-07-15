// ====================================================================
// FILE: Navbar.jsx
// LOCATION: /src/Navbar.jsx
// PURPOSE: Main navigation bar component with authentication integration
// DESCRIPTION: Fixed header navigation with user menu and auth buttons
// ====================================================================

// React core imports for component functionality
import React from "react";
// React Router navigation hook for programmatic routing
import { useNavigate } from "react-router-dom";
// Clerk authentication components for user state and UI elements
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

// ====================================================================
// MAIN COMPONENT: Navbar
// PURPOSE: Application header navigation with authentication integration
// LOCATION: Fixed header across all non-auth pages
// PROPS: currentPage - identifier for highlighting active navigation item
// ====================================================================
const Navbar = ({ currentPage }) => {
    // ================================================================
    // HOOKS SECTION
    // LOCATION: Top of Navbar component
    // PURPOSE: Access navigation functionality
    // ================================================================

    // React Router navigation hook for programmatic page navigation
    const navigate = useNavigate();

    // ================================================================
    // COMPONENT RENDER SECTION
    // LOCATION: Main return statement of Navbar component
    // ================================================================
    return (
        // ============================================================
        // MAIN NAVBAR CONTAINER: Fixed header navigation
        // STYLING: Fixed positioning, full width, white background with shadow
        // ============================================================
        <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">

            {/* ========================================================
                NAVBAR CONTENT WRAPPER: Container with max width and padding
                STYLING: Flexbox layout for horizontal navigation items
                ======================================================== */}
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">

                {/* ====================================================
                    BRAND LOGO SECTION: Company name and home link
                    LOCATION: Left side of navbar
                    FUNCTIONALITY: Click to navigate to home page
                    ==================================================== */}
                <div
                    className="text-xl text-blue-600 font-bold cursor-pointer hover:text-blue-800 transition-all duration-200 px-4 h-full flex items-center hover:bg-gray-200"
                    onClick={() => navigate('/')} // Navigate to home page on click
                >
                    Netlease Finder {/* Company/application name */}
                </div>

                {/* ====================================================
                    NAVIGATION ITEMS SECTION: Right side navigation elements
                    LOCATION: Right side of navbar
                    CONTAINS: Saved listings and user auth
                    ==================================================== */}
                <div className="flex items-center h-full">

                    {/* ================================================
                        SAVED LISTINGS LINK: Navigation to saved properties
                        STYLING: Conditional highlighting for active page
                        FUNCTIONALITY: Navigate to saved listings page
                        ================================================ */}
                    <div
                        className={`cursor-pointer transition-all duration-200 relative px-6 h-full flex items-center ${
                            // Conditional styling based on current page
                            currentPage === 'saved' 
                                ? 'text-blue-600 font-medium bg-gray-200' // Active state styling
                                : 'hover:text-blue-600 hover:bg-gray-200' // Hover state styling
                        }`}
                        onClick={() => navigate('/saved')} // Navigate to saved listings
                    >
                        Saved Listings {/* Navigation link text */}
                    </div>

                    {/* ================================================
                        USER AUTHENTICATION SECTION: Sign-in/out controls
                        LOCATION: Right of saved listings link
                        CONDITIONAL: Different content for signed-in vs signed-out users
                        ================================================ */}
                    <div className="transition-all duration-200 relative px-6 h-full flex items-center">

                        {/* ============================================
                            SIGNED-IN USER STATE: Show user button when authenticated
                            COMPONENT: Clerk UserButton with custom styling
                            ============================================ */}
                        <SignedIn>
                            <UserButton
                                appearance={{
                                    elements: {
                                        avatarBox: "w-8 h-8" // Custom avatar size
                                    }
                                }}
                                afterSignOutUrl="/" // Redirect to home after sign out
                            />
                        </SignedIn>

                        {/* ============================================
                            SIGNED-OUT USER STATE: Show sign-in/up buttons
                            BUTTONS: Sign In (text) and Sign Up (filled)
                            ============================================ */}
                        <SignedOut>
                            <div className="flex gap-2">
                                {/* Sign In button - text style */}
                                <button
                                    onClick={() => navigate('/sign-in')} // Navigate to sign-in page
                                    className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                                >
                                    Sign In
                                </button>
                                {/* Sign Up button - filled style for emphasis */}
                                <button
                                    onClick={() => navigate('/sign-up')} // Navigate to sign-up page
                                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 font-medium cursor-pointer"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </SignedOut>
                    </div>
                </div> {/* End of navigation items section */}
            </div> {/* End of navbar content wrapper */}
        </nav> // End of main navbar container
    );
}; // End of Navbar component function

// ====================================================================
// COMPONENT EXPORT
// PURPOSE: Make Navbar component available for import in other files
// USAGE: Imported in App.jsx for application-wide navigation
// ====================================================================
export default Navbar;
