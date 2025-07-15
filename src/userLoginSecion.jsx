// ====================================================================
// FILE: userLoginSecion.jsx (NOTE: Filename has typo - should be "userLoginSection.jsx")
// LOCATION: /src/userLoginSecion.jsx
// PURPOSE: User dropdown component for navigation and account actions
// DESCRIPTION: Dropdown menu with user avatar, name, and action items
// STATUS: Appears to be unused - replaced by Clerk UserButton in Navbar
// ====================================================================

// React core imports for component functionality and state management
import React, { useState, useRef, useEffect } from "react";
// Custom user context hook for accessing user data and logout function
import { useUser } from "./UserContext";

// ====================================================================
// MAIN COMPONENT: UserDropdown
// PURPOSE: User profile dropdown with navigation and account actions
// LOCATION: Standalone component (not currently used in application)
// NOTE: This appears to be legacy code - Navbar now uses Clerk's UserButton
// ====================================================================
const UserDropdown = () => {
    // ================================================================
    // CONTEXT HOOKS SECTION
    // LOCATION: Top of UserDropdown component
    // ================================================================

    // User context: Access user data and logout functionality
    const { user, onLogout } = useUser();

    // ================================================================
    // STATE MANAGEMENT SECTION
    // LOCATION: After context hooks in UserDropdown component
    // ================================================================

    // State: Controls dropdown open/closed state
    const [open, setOpen] = useState(false);

    // Ref: Reference to dropdown container for click-outside detection
    const dropdownRef = useRef();

    // ================================================================
    // EFFECT HOOKS SECTION
    // LOCATION: After state declarations in UserDropdown component
    // PURPOSE: Handle side effects and event listeners
    // ================================================================

    // Effect: Handle clicks outside dropdown to close it
    // PURPOSE: Improve UX by closing dropdown when user clicks elsewhere
    useEffect(() => {
        // Event handler: Close dropdown on outside clicks
        const handleClickOutside = (e) => {
            // Check if click is outside dropdown container
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false); // Close the dropdown
            }
        };

        // Add event listener for document-wide mouse clicks
        document.addEventListener("mousedown", handleClickOutside);

        // Cleanup: Remove event listener on component unmount
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []); // Empty dependency array - run once on mount

    // ================================================================
    // COMPONENT RENDER SECTION
    // LOCATION: Main return statement of UserDropdown component
    // ================================================================
    return (
        // ============================================================
        // DROPDOWN CONTAINER: Relative positioned container for dropdown
        // PURPOSE: Contains dropdown trigger and menu elements
        // ============================================================
        <div className="relative inline-block text-left" ref={dropdownRef}>

            {/* ========================================================
                DROPDOWN TRIGGER: User avatar and name button
                FUNCTIONALITY: Toggle dropdown visibility on click
                ======================================================== */}
            <button
                onClick={() => setOpen(!open)} // Toggle dropdown state
                className="flex items-center space-x-2 focus:outline-none cursor-pointer"
            >
                {/* ====================================================
                    USER AVATAR: Profile image display
                    STYLING: Small circular image with object cover
                    ==================================================== */}
                <img
                    src={user.avatar} // User's profile image from context
                    alt="avatar" // Accessibility alt text
                    className="w-6 h-6 rounded-full object-cover"
                />

                {/* User's full name display */}
                <span className="text-sm font-normal text-gray-600">
                    {user.firstName} {user.lastName}
                </span>

                {/* ====================================================
                    DROPDOWN ARROW: Visual indicator for dropdown
                    STYLING: Small chevron down icon
                    ==================================================== */}
                <svg
                    className="w-3 h-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* ========================================================
                DROPDOWN MENU: Conditional menu display
                CONDITIONAL: Only shown when open state is true
                POSITION: Absolute positioned below trigger
                ======================================================== */}
            {open && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl z-50">

                    {/* ====================================================
                        DROPDOWN MENU CONTENT: List of menu options
                        STYLING: Vertical list with hover effects
                        ==================================================== */}
                    <div className="py-2">

                        {/* ================================================
                            PROPERTY NAVIGATION SECTION: Property-related actions
                            NOTE: These are placeholder buttons without functionality
                            ================================================ */}

                        {/* Browse Properties - placeholder menu item */}
                        <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                            Browse Properties
                        </button>

                        {/* Search Filters - placeholder menu item */}
                        <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                            Search Filters
                        </button>

                        {/* Property Alerts - placeholder menu item */}
                        <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                            Property Alerts
                        </button>

                        {/* Divider line between menu sections */}
                        <hr className="my-2 border-gray-200" />

                        {/* ================================================
                            SUPPORT NAVIGATION SECTION: Help and settings
                            NOTE: These are placeholder buttons without functionality
                            ================================================ */}

                        {/* Help & Support - placeholder menu item */}
                        <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                            Help & Support
                        </button>

                        {/* Settings - placeholder menu item */}
                        <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                            Settings
                        </button>

                        {/* Divider line before logout section */}
                        <hr className="my-2 border-gray-200" />

                        {/* ================================================
                            LOGOUT SECTION: User session termination
                            FUNCTIONALITY: Actual logout implementation
                            STYLING: Red text to indicate destructive action
                            ================================================ */}
                        <button
                            onClick={onLogout} // Trigger logout function from context
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}; // End of UserDropdown component

// ====================================================================
// COMPONENT EXPORT
// PURPOSE: Make UserDropdown component available for import
// USAGE: Not currently used - appears to be legacy/unused code
// NOTE: Application uses Clerk's UserButton instead in Navbar component
// ====================================================================
export default UserDropdown;
