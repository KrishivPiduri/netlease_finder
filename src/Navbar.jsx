import React from "react";
import UserLoginSecion from "./userLoginSecion.jsx";

const Navbar = ({ currentPage, setCurrentPage }) => {
    return (
        <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                <div
                    className="text-xl text-blue-600 font-bold cursor-pointer hover:text-blue-800 transition-colors"
                    onClick={() => setCurrentPage('home')}
                >
                    Netlease Finder
                </div>
                <ul className="flex space-x-6 items-center">
                    <li
                        className={`cursor-pointer transition-colors relative ${
                            currentPage === 'saved' ? 'text-blue-600 font-medium' : 'hover:text-blue-600'
                        }`}
                        onClick={() => setCurrentPage('saved')}
                    >
                        Saved Listings
                    </li>
                    <UserLoginSecion />
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
