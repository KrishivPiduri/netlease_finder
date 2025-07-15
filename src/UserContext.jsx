// ====================================================================
// FILE: UserContext.jsx
// LOCATION: /src/UserContext.jsx
// PURPOSE: Global user state management and Clerk authentication integration
// DESCRIPTION: React context for user data, settings, and saved properties
// ====================================================================

// React core imports for context creation and state management
import React, { createContext, useContext, useState, useEffect } from "react";
// Clerk authentication hook for accessing authenticated user data
import { useUser as useClerkUser } from "@clerk/clerk-react";

// ====================================================================
// CONTEXT CREATION SECTION
// LOCATION: Top of UserContext.jsx file
// PURPOSE: Create React context for global user state
// ====================================================================

// React Context: Global user state container
// USAGE: Provides user data, settings, and functions across entire application
const UserContext = createContext();

// ====================================================================
// USER PROVIDER COMPONENT: UserProvider
// PURPOSE: Context provider that manages all user-related state
// LOCATION: Wraps entire application in main.jsx
// PROPS: children - All application components that need user context
// ====================================================================
export const UserProvider = ({ children }) => {
    // ================================================================
    // CLERK INTEGRATION SECTION
    // LOCATION: Top of UserProvider component
    // PURPOSE: Access Clerk authentication state and user data
    // ================================================================

    // Clerk user hook: Access authenticated user data and loading state
    const { user: clerkUser, isLoaded, isSignedIn } = useClerkUser();

    // ================================================================
    // SAVED PROPERTIES STATE SECTION
    // LOCATION: After Clerk integration in UserProvider
    // PURPOSE: Track user's bookmarked/saved properties with Clerk persistence
    // NOTE: Removed redundant local user state - using Clerk user directly
    // ================================================================

    // State: Array of properties saved by the user
    // USAGE: For saved listings page and bookmark functionality
    const [savedProperties, setSavedProperties] = useState([]);

    // State: Loading state for saved properties operations
    const [isSavingProperty, setIsSavingProperty] = useState(false);

    // ================================================================
    // LOAD SAVED PROPERTIES FROM CLERK EFFECT
    // LOCATION: After saved properties state
    // PURPOSE: Load saved properties from Clerk user metadata when user is authenticated
    // ================================================================

    // Effect: Load saved properties from Clerk user metadata
    useEffect(() => {
        if (isLoaded && isSignedIn && clerkUser) {
            // Get saved properties from Clerk user's private metadata
            const clerkSavedProperties = clerkUser.privateMetadata?.savedProperties || [];
            setSavedProperties(clerkSavedProperties);
        } else if (isLoaded && !isSignedIn) {
            // Clear saved properties when user is not signed in
            setSavedProperties([]);
        }
    }, [isLoaded, isSignedIn, clerkUser?.privateMetadata]);

    // ================================================================
    // USER SETTINGS STATE SECTION
    // LOCATION: After saved properties state
    // PURPOSE: Manage user preferences and application settings
    // NOTE: Settings are user-specific and persist in localStorage with user ID
    // ================================================================

    // State: User settings with localStorage persistence per user
    // INITIALIZATION: Load from localStorage using user ID or use defaults
    const [settings, setSettings] = useState(() => {
        // Only load settings if user is authenticated
        if (isSignedIn && clerkUser?.id) {
            // Use user-specific localStorage key
            const userSettingsKey = `userSettings_${clerkUser.id}`;
            const savedSettings = localStorage.getItem(userSettingsKey);

            if (savedSettings) {
                return JSON.parse(savedSettings);
            }
        }

        // Return default settings for new users or unauthenticated state
        return {
            // Notification preferences
            emailNotifications: true, // Email notifications enabled by default
            propertyAlerts: true, // Property alert notifications enabled
            marketingEmails: false, // Marketing emails disabled by default

            // UI preferences
            darkMode: false, // Light mode by default
            language: 'en', // English language default
            currency: 'USD', // US Dollar currency default

            // Search preferences
            priceRange: {
                min: 0, // Minimum price filter
                max: 10000000 // Maximum price filter (10M)
            },

            // Property type preferences
            preferredPropertyTypes: {
                retail: true, // Retail properties enabled
                office: true, // Office properties enabled
                industrial: false, // Industrial properties disabled
                medical: false // Medical properties disabled
            }
        };
    });

    // ================================================================
    // SETTINGS PERSISTENCE EFFECT
    // LOCATION: After settings state declaration
    // PURPOSE: Automatically save settings to localStorage when changed
    // NOTE: Only save if user is authenticated
    // ================================================================

    // Effect: Save settings to localStorage whenever settings change
    // TRIGGERS: Any change to the settings state object or user authentication
    useEffect(() => {
        // Only persist settings if user is authenticated
        if (isSignedIn && clerkUser?.id) {
            const userSettingsKey = `userSettings_${clerkUser.id}`;
            localStorage.setItem(userSettingsKey, JSON.stringify(settings));
        }
    }, [settings, isSignedIn, clerkUser?.id]); // Dependencies: settings, auth state, and user ID

    // ================================================================
    // USER DATA MANAGEMENT FUNCTIONS SECTION
    // LOCATION: After state declarations and effects
    // PURPOSE: Provide functions to update settings (removed redundant user functions)
    // ================================================================

    // Function: Update entire settings object
    // PURPOSE: Replace settings with new settings object
    // PARAMS: newSettings - Complete or partial settings object
    const updateSettings = (newSettings) => {
        setSettings(prev => ({ ...prev, ...newSettings })); // Merge with existing settings
    };

    // Function: Update individual setting value
    // PURPOSE: Update specific setting with granular control
    // PARAMS: category, setting, value - Nested setting path and new value
    const updateSetting = (category, setting, value) => {
        // Handle nested price range settings
        if (category === 'priceRange') {
            setSettings(prev => ({
                ...prev,
                priceRange: {
                    ...prev.priceRange,
                    [setting]: value // Update min or max price
                }
            }));
        }
        // Handle nested property type preferences
        else if (category === 'propertyTypes') {
            setSettings(prev => ({
                ...prev,
                preferredPropertyTypes: {
                    ...prev.preferredPropertyTypes,
                    [setting]: value // Update specific property type preference
                }
            }));
        }
        // Handle top-level settings
        else {
            setSettings(prev => ({
                ...prev,
                [setting]: value // Update top-level setting
            }));
        }
    };

    // ================================================================
    // USER SESSION MANAGEMENT FUNCTIONS SECTION
    // LOCATION: After settings functions
    // PURPOSE: Handle user authentication lifecycle events
    // NOTE: Simplified to work with Clerk's authentication flow
    // ================================================================

    // Function: Handle user logout cleanup
    // PURPOSE: Clear application data when user signs out
    // NOTE: Clerk handles the actual authentication logout
    const handleSignOut = () => {
        setSavedProperties([]); // Clear saved properties

        // Clear user-specific settings from localStorage
        if (clerkUser?.id) {
            const userSettingsKey = `userSettings_${clerkUser.id}`;
            localStorage.removeItem(userSettingsKey);
        }

        // Reset settings to default values
        setSettings({
            emailNotifications: true,
            propertyAlerts: true,
            marketingEmails: false,
            darkMode: false,
            language: 'en',
            currency: 'USD',
            priceRange: {
                min: 0,
                max: 10000000
            },
            preferredPropertyTypes: {
                retail: true,
                office: true,
                industrial: false,
                medical: false
            }
        });
    };

    // ================================================================
    // PROPERTY MANAGEMENT FUNCTIONS SECTION
    // LOCATION: After session management functions
    // PURPOSE: Handle user's saved/bookmarked properties with Clerk persistence
    // ================================================================

    // Function: Toggle property saved status with Clerk persistence
    // PURPOSE: Add or remove property from user's saved list and sync with Clerk
    // PARAMS: property - Property object to save/unsave
    const saveProperty = async (property) => {
        // Only allow saving if user is authenticated
        if (!isSignedIn || !clerkUser) {
            console.warn('User must be signed in to save properties');
            return;
        }

        setIsSavingProperty(true);

        try {
            // Get current saved properties from state
            const currentSavedProperties = [...savedProperties];
            let updatedSavedProperties;

            // Check if property is already saved
            const existingPropertyIndex = currentSavedProperties.findIndex(p => p.id === property.id);

            if (existingPropertyIndex > -1) {
                // Property already saved - remove it (unsave)
                updatedSavedProperties = currentSavedProperties.filter(p => p.id !== property.id);
                console.log('Property removed from saved list:', property.name);
            } else {
                // Property not saved - add it to saved list
                // Add timestamp for when property was saved
                const propertyWithTimestamp = {
                    ...property,
                    savedAt: new Date().toISOString()
                };
                updatedSavedProperties = [...currentSavedProperties, propertyWithTimestamp];
                console.log('Property added to saved list:', property.name);
            }

            // Update local state immediately for responsive UI
            setSavedProperties(updatedSavedProperties);

            // Update Clerk user's private metadata
            await clerkUser.update({
                privateMetadata: {
                    ...clerkUser.privateMetadata,
                    savedProperties: updatedSavedProperties
                }
            });

            console.log('Saved properties synced with Clerk successfully');

        } catch (error) {
            console.error('Error saving property to Clerk:', error);

            // Revert local state on error
            const clerkSavedProperties = clerkUser.privateMetadata?.savedProperties || [];
            setSavedProperties(clerkSavedProperties);

            // TODO: Show user-friendly error message
            alert('Failed to save property. Please try again.');
        } finally {
            setIsSavingProperty(false);
        }
    };

    // Function: Check if property is saved
    // PURPOSE: Determine if a property is in user's saved list
    // PARAMS: propertyId - ID of property to check
    // RETURNS: Boolean indicating if property is saved
    const isPropertySaved = (propertyId) => {
        return savedProperties.some(p => p.id === propertyId);
    };

    // Function: Clear all saved properties
    // PURPOSE: Remove all saved properties from user's account
    const clearAllSavedProperties = async () => {
        if (!isSignedIn || !clerkUser) {
            console.warn('User must be signed in to clear saved properties');
            return;
        }

        setIsSavingProperty(true);

        try {
            // Clear local state
            setSavedProperties([]);

            // Update Clerk user's private metadata
            await clerkUser.update({
                privateMetadata: {
                    ...clerkUser.privateMetadata,
                    savedProperties: []
                }
            });

            console.log('All saved properties cleared from Clerk');
        } catch (error) {
            console.error('Error clearing saved properties from Clerk:', error);

            // Revert local state on error
            const clerkSavedProperties = clerkUser.privateMetadata?.savedProperties || [];
            setSavedProperties(clerkSavedProperties);

            alert('Failed to clear saved properties. Please try again.');
        } finally {
            setIsSavingProperty(false);
        }
    };

    // ================================================================
    // CONTEXT PROVIDER RENDER SECTION
    // LOCATION: Return statement of UserProvider
    // PURPOSE: Provide all user-related state and functions to children
    // ================================================================
    return (
        // ============================================================
        // USER CONTEXT PROVIDER: Makes user state available to all children
        // VALUE: All user data, functions, and state for global access
        // ============================================================
        <UserContext.Provider value={{
            // Clerk authentication state (primary source of truth)
            user: clerkUser, // Use Clerk user object directly
            isLoaded, // Clerk loading state
            isSignedIn, // Clerk authentication status

            // Application-specific functionality
            savedProperties, // Array of user's saved properties (from Clerk)
            saveProperty, // Function to save/unsave properties (with Clerk sync)
            isPropertySaved, // Function to check if property is saved
            clearAllSavedProperties, // Function to clear all saved properties
            isSavingProperty, // Loading state for save operations

            // Settings functionality
            settings, // User settings object
            updateSettings, // Function to update entire settings
            updateSetting, // Function to update individual settings

            // Session management
            handleSignOut // Function to clean up on sign out
        }}>
            {children} {/* Render all child components with context access */}
        </UserContext.Provider>
    );
}; // End of UserProvider component

// ====================================================================
// CUSTOM HOOK EXPORT: useUser
// PURPOSE: Convenient hook to access user context in any component
// LOCATION: Used throughout application for user state access
// USAGE: const { user, settings, saveProperty } = useUser();
// ====================================================================
export const useUser = () => useContext(UserContext);
