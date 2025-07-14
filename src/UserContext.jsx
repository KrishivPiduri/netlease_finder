import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    // Example initial user state; replace with real auth logic as needed
    const [user, setUser] = useState({
        firstName: "John",
        lastName: "Doe",
        avatar: "https://i.pravatar.cc/150?img=3"
    });

    // Saved properties state
    const [savedProperties, setSavedProperties] = useState([]);

    const onLogout = () => {
        setUser(null);
        setSavedProperties([]);
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
            onLogout,
            savedProperties,
            saveProperty,
            isPropertySaved
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
