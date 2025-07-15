// ====================================================================
// FILE: Settings.jsx
// LOCATION: /src/pages/Settings.jsx
// PURPOSE: User profile and account settings management page
// DESCRIPTION: Protected page for managing user profile, account settings, and preferences
// ====================================================================

// React core imports for component functionality and state management
import React, { useState, useEffect } from 'react';
// Custom user context hook for accessing user data and settings
import { useUser } from '../UserContext';

// ====================================================================
// MAIN COMPONENT: Settings
// PURPOSE: User settings and profile management interface
// LOCATION: Rendered at /settings route (protected)
// USAGE: Allows authenticated users to view and manage their profile
// ====================================================================
const Settings = () => {
    // ================================================================
    // CONTEXT HOOKS SECTION
    // LOCATION: Top of Settings component
    // ================================================================

    // User context: Access user profile data from global state
    const { user } = useUser();

    // ================================================================
    // LOCAL STATE MANAGEMENT SECTION
    // LOCATION: After context hooks in Settings component
    // PURPOSE: Manage editable profile settings locally
    // ================================================================

    // State: Local copy of profile settings for editing
    // INITIALIZATION: Populate from user context with fallback empty strings
    const [profileSettings, setProfileSettings] = useState({
        firstName: user?.firstName || '', // User's first name from context
        lastName: user?.lastName || '', // User's last name from context
        email: user?.email || '', // User's email address from context
        phone: user?.phone || '', // User's phone number from context
        company: user?.company || '', // User's company from context
        title: user?.title || '' // User's job title from context
    });

    // ================================================================
    // SYNCHRONIZATION EFFECT SECTION
    // LOCATION: After state declarations in Settings component
    // PURPOSE: Keep local state in sync with user context changes
    // ================================================================

    // Effect: Update local profile state when user context changes
    // TRIGGERS: When user data is loaded or updated from authentication
    useEffect(() => {
        // Sync local profile settings with latest user context data
        setProfileSettings({
            firstName: user?.firstName || '',
            lastName: user?.lastName || '',
            email: user?.email || '',
            phone: user?.phone || '',
            company: user?.company || '',
            title: user?.title || ''
        });
    }, [user]); // Dependency: user context changes

    // ================================================================
    // UTILITY FUNCTIONS SECTION
    // LOCATION: After state and effects in Settings component
    // PURPOSE: Helper functions for profile display and formatting
    // ================================================================

    // Function: Generate user initials for avatar display
    // PURPOSE: Create two-letter initials from first and last name
    // RETURNS: Uppercase initials string (e.g., "JS" for John Smith)
    const getInitials = () => {
        const firstName = profileSettings.firstName || 'A'; // Fallback to 'A'
        const lastName = profileSettings.lastName || 'S'; // Fallback to 'S'
        return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    };

    // Function: Get formatted full name for display
    // PURPOSE: Combine first and last name with proper spacing
    // RETURNS: Full name string with fallback to "User Name"
    const getFullName = () => {
        return `${profileSettings.firstName} ${profileSettings.lastName}`.trim() || 'User Name';
    };

    // ================================================================
    // COMPONENT RENDER SECTION
    // LOCATION: Main return statement of Settings component
    // ================================================================
    return (
        // ============================================================
        // SETTINGS PAGE CONTAINER: Main container for settings content
        // STYLING: Max width with padding and font family
        // ============================================================
        <div className="max-w-4xl mx-auto p-6 font-sans">

            {/* ========================================================
                PAGE HEADER SECTION: Welcome message and page title
                LOCATION: Top of settings page
                ======================================================== */}
            <div className="mb-8">
                {/* Page title with personalized greeting */}
                <h2 className="text-3xl font-semibold text-gray-900 mb-2">
                    Welcome Back, {profileSettings.firstName || 'User'}
                </h2>
            </div>

            {/* ========================================================
                PERSONAL SECTION: User profile information display
                LOCATION: First section below header
                PURPOSE: Show user's personal profile details
                ======================================================== */}
            <div className="bg-white border border-gray-200 rounded-lg mb-6 overflow-hidden">

                {/* ====================================================
                    PERSONAL SECTION HEADER: Section title
                    STYLING: Gray background with border
                    ==================================================== */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 m-0">Personal</h3>
                </div>

                {/* ====================================================
                    PERSONAL SECTION CONTENT: Profile display with avatar
                    LAYOUT: Flexbox with avatar, name, and edit button
                    ==================================================== */}
                <div className="p-6">
                    <div className="flex items-start gap-4">

                        {/* ========================================
                            USER AVATAR: Circular avatar with initials
                            STYLING: Blue background with white text
                            ======================================== */}
                        <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-lg font-semibold">
                            {getInitials()} {/* Display user initials */}
                        </div>

                        {/* ========================================
                            USER INFO: Name and profile details
                            LAYOUT: Flexible container for user information
                            ======================================== */}
                        <div className="flex-1">
                            <div className="text-xl font-semibold text-gray-900 mb-2">
                                {getFullName()} {/* Display formatted full name */}
                            </div>
                        </div>

                        {/* ========================================
                            EDIT ACTION: Edit profile button
                            FUNCTIONALITY: Placeholder for profile editing
                            ======================================== */}
                        <div className="flex-none">
                            <a className="text-blue-500 hover:text-blue-700 text-sm font-medium cursor-pointer hover:underline">
                                Edit {/* TODO: Implement profile editing functionality */}
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* ========================================================
                ACCOUNT SECTION: Account settings and security
                LOCATION: Second section below personal section
                PURPOSE: Manage account security and contact settings
                ======================================================== */}
            <div className="bg-white border border-gray-200 rounded-lg mb-6 overflow-hidden">

                {/* ====================================================
                    ACCOUNT SECTION HEADER: Section title
                    STYLING: Gray background with border
                    ==================================================== */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 m-0">Account</h3>
                </div>

                {/* ====================================================
                    ACCOUNT SECTION CONTENT: List of account settings
                    LAYOUT: Vertical list of account management options
                    ==================================================== */}
                <div className="p-6">

                    {/* ========================================
                        PASSWORD SETTING: Password management option
                        LAYOUT: Label, description, and edit action
                        ======================================== */}
                    <div className="flex py-4 border-b border-gray-200">
                        {/* Setting label column */}
                        <div className="flex-none w-36 flex items-center gap-2">
                            <span className="font-semibold text-gray-900 text-sm">Password</span>
                        </div>
                        {/* Setting content and action column */}
                        <div className="flex-1 flex items-center justify-between">
                            <span className="text-gray-600 text-sm">
                                Change your password {/* Setting description */}
                            </span>
                            <a className="text-blue-500 hover:text-blue-700 text-sm font-medium cursor-pointer hover:underline">
                                Edit {/* TODO: Implement password change functionality */}
                            </a>
                        </div>
                    </div>

                    {/* ========================================
                        EMAIL SETTING: Email management option
                        LAYOUT: Label, description, and edit action
                        ======================================== */}
                    <div className="flex py-4 border-b border-gray-200">
                        {/* Setting label column */}
                        <div className="flex-none w-36 flex items-center gap-2">
                            <span className="font-semibold text-gray-900 text-sm">Email</span>
                        </div>
                        {/* Setting content and action column */}
                        <div className="flex-1 flex items-center justify-between">
                            <span className="text-gray-600 text-sm">
                                Change your email {/* Setting description */}
                            </span>
                            <a className="text-blue-500 hover:text-blue-700 text-sm font-medium cursor-pointer hover:underline">
                                Edit {/* TODO: Implement email change functionality */}
                            </a>
                        </div>
                    </div>

                    {/* ========================================
                        PHONE SETTING: Phone number management option
                        LAYOUT: Label, description, and edit action
                        NOTE: No bottom border (last item)
                        ======================================== */}
                    <div className="flex py-4">
                        {/* Setting label column */}
                        <div className="flex-none w-36 flex items-center gap-2">
                            <span className="font-semibold text-gray-900 text-sm">Phone</span>
                        </div>
                        {/* Setting content and action column */}
                        <div className="flex-1 flex items-center justify-between">
                            <span className="text-gray-600 text-sm">
                                Change your cell and work phone {/* Setting description */}
                            </span>
                            <a className="text-blue-500 hover:text-blue-700 text-sm font-medium cursor-pointer hover:underline">
                                Edit {/* TODO: Implement phone change functionality */}
                            </a>
                        </div>
                    </div>
                </div> {/* End of account section content */}
            </div> {/* End of account section */}
        </div> // End of settings page container
    );
}; // End of Settings component

// ====================================================================
// COMPONENT EXPORT
// PURPOSE: Make Settings component available for import in routing
// USAGE: Imported in App.jsx for /settings protected route
// ====================================================================
export default Settings;
