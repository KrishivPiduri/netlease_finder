import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    // Example initial user state; replace with real auth logic as needed
    const [user, setUser] = useState({
        firstName: "John",
        lastName: "Doe",
        avatar: "https://i.pravatar.cc/150?img=3",
        email: "john.doe@example.com",
        phone: "",
        company: "",
        title: ""
    });

    // Saved properties state
    const [savedProperties, setSavedProperties] = useState([]);

    // Settings state
    const [settings, setSettings] = useState(() => {
        // Try to load settings from localStorage
        const savedSettings = localStorage.getItem('userSettings');
        return savedSettings ? JSON.parse(savedSettings) : {
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
        };
    });

    // Save settings to localStorage whenever settings change
    useEffect(() => {
        localStorage.setItem('userSettings', JSON.stringify(settings));
    }, [settings]);

    const updateUser = (userData) => {
        setUser(prev => ({ ...prev, ...userData }));
    };

    const updateSettings = (newSettings) => {
        setSettings(prev => ({ ...prev, ...newSettings }));
    };

    const updateSetting = (category, setting, value) => {
        if (category === 'priceRange') {
            setSettings(prev => ({
                ...prev,
                priceRange: {
                    ...prev.priceRange,
                    [setting]: value
                }
            }));
        } else if (category === 'propertyTypes') {
            setSettings(prev => ({
                ...prev,
                preferredPropertyTypes: {
                    ...prev.preferredPropertyTypes,
                    [setting]: value
                }
            }));
        } else {
            setSettings(prev => ({
                ...prev,
                [setting]: value
            }));
        }
    };

    const onLogout = () => {
        setUser(null);
        setSavedProperties([]);
        // Clear settings from localStorage on logout
        localStorage.removeItem('userSettings');
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
        // Add additional logout logic here (e.g., clearing tokens)
    };

    const saveProperty = (property) => {
        setSavedProperties(prev => {
            if (prev.find(p => p.id === property.id)) {
                // Property already saved, remove it
                return prev.filter(p => p.id !== property.id);
            } else {
                // Property not saved, add it
                return [...prev, property];
            }
        });
    };

    const isPropertySaved = (propertyId) => {
        return savedProperties.some(p => p.id === propertyId);
    };

    return (
        <UserContext.Provider value={{
            user,
            setUser,
            updateUser,
            onLogout,
            savedProperties,
            saveProperty,
            isPropertySaved,
            settings,
            updateSettings,
            updateSetting
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
