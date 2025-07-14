import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    // Example initial user state; replace with real auth logic as needed
    const [user, setUser] = useState({
        firstName: "John",
        lastName: "Doe",
        avatar: "https://i.pravatar.cc/150?img=3"
    });

    const onLogout = () => {
        setUser(null);
        // Add additional logout logic here (e.g., clearing tokens)
    };

    return (
        <UserContext.Provider value={{ user, setUser, onLogout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);

