// ====================================================================
// FILE: Navbar.jsx
// LOCATION: /src/Navbar.jsx
// PURPOSE: Main navigation bar component with authentication integration
// DESCRIPTION: Fixed header navigation with user menu, auth buttons, and hamburger menu
// ====================================================================

// React core imports for component functionality and hooks
import React, { useState, useRef, useEffect } from "react";
// React Router navigation hook for programmatic routing
import { useNavigate } from "react-router-dom";
// Clerk authentication components for user state and UI elements
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
// Custom user context hook for application-wide user data
import { useUser } from "./UserContext";

// ====================================================================
// MAIN COMPONENT: Navbar
// PURPOSE: Application header navigation with authentication integration
// LOCATION: Fixed header across all non-auth pages
// PROPS: currentPage - identifier for highlighting active navigation item
// ====================================================================
const Navbar = ({ currentPage }) => {
    // ================================================================
    // CONTEXT AND HOOKS SECTION
    // LOCATION: Top of Navbar component
    // PURPOSE: Access application state and navigation functionality
    // ================================================================

    // User context hook to access saved properties count and user data
    const { savedProperties } = useUser();

    // React Router navigation hook for programmatic page navigation
    const navigate = useNavigate();

    // ================================================================
    // STATE MANAGEMENT SECTION
    // LOCATION: After context hooks in Navbar component
    // ================================================================

    // State: Controls hamburger menu open/closed state
    const [hamburgerOpen, setHamburgerOpen] = useState(false);

    // Ref: Reference to hamburger menu container for click-outside detection
    const hamburgerRef = useRef();

    // ================================================================
    // EFFECT HOOKS SECTION
    // LOCATION: After state declarations in Navbar component
    // PURPOSE: Handle side effects and event listeners
    // ================================================================

    // Effect: Handle clicks outside hamburger menu to close it
    // PURPOSE: Improve UX by closing menu when user clicks elsewhere
    useEffect(() => {
        // Event handler: Close hamburger menu on outside clicks
        const handleClickOutside = (e) => {
            // Check if click is outside hamburger menu container
            if (hamburgerRef.current && !hamburgerRef.current.contains(e.target)) {
                setHamburgerOpen(false); // Close the menu
            }
        };

        // Add event listener for document-wide mouse clicks
        document.addEventListener("mousedown", handleClickOutside);

        // Cleanup: Remove event listener on component unmount
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []); // Empty dependency array - run once on mount

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
                    CONTAINS: Saved listings, user auth, hamburger menu
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
                                    className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    Sign In
                                </button>
                                {/* Sign Up button - filled style for emphasis */}
                                <button
                                    onClick={() => navigate('/sign-up')} // Navigate to sign-up page
                                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 font-medium"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </SignedOut>
                    </div>

                    {/* ================================================
                        HAMBURGER MENU SECTION: Additional navigation options
                        LOCATION: Rightmost element in navbar
                        FUNCTIONALITY: Dropdown menu with secondary navigation
                        ================================================ */}
                    <div className="cursor-pointer transition-all duration-200 relative px-4 h-full flex items-center hover:bg-gray-200" ref={hamburgerRef}>

                        {/* ============================================
                            HAMBURGER ICON BUTTON: Three-line menu icon
                            FUNCTIONALITY: Toggle dropdown menu visibility
                            ============================================ */}
                        <button
                            className="flex flex-col justify-center items-center w-6 h-6 space-y-1"
                            onClick={() => setHamburgerOpen(!hamburgerOpen)} // Toggle menu state
                        >
                            {/* Three horizontal lines forming hamburger icon */}
                            <div className="w-5 h-0.5 bg-gray-600"></div>
                            <div className="w-5 h-0.5 bg-gray-600"></div>
                            <div className="w-5 h-0.5 bg-gray-600"></div>
                        </button>

                        {/* ============================================
                            HAMBURGER DROPDOWN MENU: Secondary navigation options
                            CONDITIONAL: Only shown when hamburgerOpen is true
                            POSITION: Absolute positioned below hamburger icon
                            ============================================ */}
                        {hamburgerOpen && (
                            <div className="absolute right-0 top-16 w-56 bg-white border border-gray-200 rounded-lg shadow-xl z-50">

                                {/* ========================================
                                    DROPDOWN MENU CONTENT: Navigation links and options
                                    STYLING: Vertical list with hover effects
                                    ======================================== */}
                                <div className="py-2">

                                    {/* ==================================
                                        PLACEHOLDER MENU ITEMS: Future functionality
                                        NOTE: These are not yet implemented
                                        ================================== */}

                                    {/* Browse Properties - placeholder for property browsing */}
                                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                                        Browse Properties
                                    </button>

                                    {/* Search Filters - placeholder for advanced search */}
                                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                                        Search Filters
                                    </button>

                                    {/* Property Alerts - placeholder for notification settings */}
                                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                                        Property Alerts
                                    </button>

                                    {/* Divider line between menu sections */}
                                    <hr className="my-2 border-gray-200" />

                                    {/* Help & Support - placeholder for support functionality */}
                                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                                        Help & Support
                                    </button>

                                    {/* ==================================
                                        SETTINGS MENU ITEM: Functional navigation to settings
                                        FUNCTIONALITY: Navigate to settings page and close menu
                                        ================================== */}
                                    <button
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => {
                                            navigate('/settings'); // Navigate to settings page
                                            setHamburgerOpen(false); // Close hamburger menu
                                        }}
                                    >
                                        Settings
                                    </button>

                                </div> {/* End of dropdown menu content */}
                            </div> // End of dropdown menu container
                        )}
                    </div> {/* End of hamburger menu section */}
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
