import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./pages/Home";
import SavedListings from "./SavedListings";
import Settings from "./pages/Settings";
import { SignInPage, SignUpPage, ProtectedRoute } from "./ClerkAuth";

function App() {
    const location = useLocation();

    // Determine current page based on URL path
    const getCurrentPage = () => {
        switch(location.pathname) {
            case '/saved':
                return 'saved';
            case '/settings':
                return 'settings';
            case '/sign-in':
                return 'signin';
            case '/sign-up':
                return 'signup';
            case '/':
            default:
                return 'home';
        }
    };

    // Don't show navbar on auth pages
    const showNavbar = !location.pathname.includes('/sign-in') && !location.pathname.includes('/sign-up');

    return (
        <div>
            {showNavbar && <Navbar currentPage={getCurrentPage()} />}
            <main className={showNavbar ? "pt-20 px-4" : ""}>
                <Routes>
                    {/* Public routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/sign-in" element={<SignInPage />} />
                    <Route path="/sign-up" element={<SignUpPage />} />

                    {/* Protected routes */}
                    <Route
                        path="/saved"
                        element={
                            <ProtectedRoute>
                                <SavedListings />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/settings"
                        element={
                            <ProtectedRoute>
                                <Settings />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </main>
        </div>
    );
}

export default App;
