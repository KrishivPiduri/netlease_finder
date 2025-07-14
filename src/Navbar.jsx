import React from "react";
import UserLoginSecion from "./userLoginSecion.jsx";
import { useUser } from "./UserContext";

const Navbar = ({ currentPage, setCurrentPage }) => {
    const { savedProperties } = useUser();

    return (
        <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
                <div
                    className="text-xl text-blue-600 font-bold cursor-pointer hover:text-blue-800 transition-all duration-200 px-4 h-full flex items-center hover:bg-gray-200"
                    onClick={() => setCurrentPage('home')}
                >
                    Netlease Finder
                </div>
                <div className="flex items-center h-full space-x-6">
                    <div
                        className={`cursor-pointer transition-all duration-200 relative px-6 h-full flex items-center hover:bg-gray-200 ${
                            currentPage === 'saved' ? 'text-blue-600 font-medium bg-gray-200' : 'hover:text-blue-600'
                        }`}
                        onClick={() => setCurrentPage('saved')}
                    >
                        Saved Listings
                        {savedProperties.length > 0 && (
                            <span className="absolute top-2 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                {savedProperties.length}
                            </span>
                        )}
                    </div>
                    <div className="h-full flex items-center px-4">
                        <UserLoginSecion />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
