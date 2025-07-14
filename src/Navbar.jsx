import React from "react";
import UserLoginSecion from "./userLoginSecion.jsx";

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                <div className="text-xl font-bold">MySite</div>
                <ul className="flex space-x-6">
                    <li className="hover:text-blue-600 cursor-pointer">Saved Listings</li>
                    <UserLoginSecion user={{avatar: "https://www.w3schools.com/howto/img_avatar.png", firstName: "John", lastName: "Doe" }} />
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
