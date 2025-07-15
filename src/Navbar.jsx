import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { useUser } from "./UserContext";

const Navbar = ({ currentPage }) => {
    const { savedProperties } = useUser();
    const [hamburgerOpen, setHamburgerOpen] = useState(false);
    const hamburgerRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (hamburgerRef.current && !hamburgerRef.current.contains(e.target)) {
                setHamburgerOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
                <div
                    className="text-xl text-blue-600 font-bold cursor-pointer hover:text-blue-800 transition-all duration-200 px-4 h-full flex items-center hover:bg-gray-200"
                    onClick={() => navigate('/')}
                >
                    Netlease Finder
                </div>
                <div className="flex items-center h-full">
                    <div
                        className={`cursor-pointer transition-all duration-200 relative px-6 h-full flex items-center ${
                            currentPage === 'saved' 
                                ? 'text-blue-600 font-medium bg-gray-200' 
                                : 'hover:text-blue-600 hover:bg-gray-200'
                        }`}
                        onClick={() => navigate('/saved')}
                    >
                        Saved Listings
                    </div>
                    <div className="transition-all duration-200 relative px-6 h-full flex items-center">
                        <SignedIn>
                            <UserButton
                                appearance={{
                                    elements: {
                                        avatarBox: "w-8 h-8"
                                    }
                                }}
                                afterSignOutUrl="/"
                            />
                        </SignedIn>
                        <SignedOut>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => navigate('/sign-in')}
                                    className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    Sign In
                                </button>
                                <button
                                    onClick={() => navigate('/sign-up')}
                                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 font-medium"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </SignedOut>
                    </div>
                    <div className="cursor-pointer transition-all duration-200 relative px-4 h-full flex items-center hover:bg-gray-200" ref={hamburgerRef}>
                        <button
                            className="flex flex-col justify-center items-center w-6 h-6 space-y-1"
                            onClick={() => setHamburgerOpen(!hamburgerOpen)}
                        >
                            <div className="w-5 h-0.5 bg-gray-600"></div>
                            <div className="w-5 h-0.5 bg-gray-600"></div>
                            <div className="w-5 h-0.5 bg-gray-600"></div>
                        </button>

                        {hamburgerOpen && (
                            <div className="absolute right-0 top-16 w-56 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
                                <div className="py-2">
                                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                                        Browse Properties
                                    </button>
                                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                                        Search Filters
                                    </button>
                                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                                        Property Alerts
                                    </button>
                                    <hr className="my-2 border-gray-200" />
                                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                                        Help & Support
                                    </button>
                                    <button
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => {
                                            navigate('/settings');
                                            setHamburgerOpen(false);
                                        }}
                                    >
                                        Settings
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
