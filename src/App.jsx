import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./pages/Home";
import SavedListings from "./SavedListings";
 import Settings from "./pages/Settings";

function App() {
    const location = useLocation();

    // Determine current page based on URL path
    const getCurrentPage = () => {
        switch(location.pathname) {
            case '/saved':
                return 'saved';
            case '/settings':
                return 'settings';
            case '/':
            default:
                return 'home';
        }
    };

    return (
        <div>
            <Navbar currentPage={getCurrentPage()} />
            <main className="pt-20 px-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/saved" element={<SavedListings />} />
                    <Route path="/settings" element={<Settings />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
