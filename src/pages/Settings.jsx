import React, { useState, useEffect } from 'react';
import { useUser } from '../UserContext';

const Settings = () => {
    const { user } = useUser();
    const [profileSettings, setProfileSettings] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        phone: user?.phone || '',
        company: user?.company || '',
        title: user?.title || ''
    });

    // Update local profile state when user context changes
    useEffect(() => {
        setProfileSettings({
            firstName: user?.firstName || '',
            lastName: user?.lastName || '',
            email: user?.email || '',
            phone: user?.phone || '',
            company: user?.company || '',
            title: user?.title || ''
        });
    }, [user]);

    const getInitials = () => {
        const firstName = profileSettings.firstName || 'A';
        const lastName = profileSettings.lastName || 'S';
        return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    };

    const getFullName = () => {
        return `${profileSettings.firstName} ${profileSettings.lastName}`.trim() || 'User Name';
    };

    return (
        <div className="max-w-4xl mx-auto p-6 font-sans">
            {/* Header Section */}
            <div className="mb-8">
                <h2 className="text-3xl font-semibold text-gray-900 mb-2">
                    Welcome Back, {profileSettings.firstName || 'User'}
                </h2>
            </div>

            {/* Personal Section */}
            <div className="bg-white border border-gray-200 rounded-lg mb-6 overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 m-0">Personal</h3>
                </div>
                <div className="p-6">
                    <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-lg font-semibold">
                            {getInitials()}
                        </div>
                        <div className="flex-1">
                            <div className="text-xl font-semibold text-gray-900 mb-2">
                                {getFullName()}
                            </div>
                        </div>
                        <div className="flex-none">
                            <a className="text-blue-500 hover:text-blue-700 text-sm font-medium cursor-pointer hover:underline">
                                Edit
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Account Section */}
            <div className="bg-white border border-gray-200 rounded-lg mb-6 overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 m-0">Account</h3>
                </div>
                <div className="p-6">
                    <div className="flex py-4 border-b border-gray-200">
                        <div className="flex-none w-36 flex items-center gap-2">
                            <span className="font-semibold text-gray-900 text-sm">Password</span>
                        </div>
                        <div className="flex-1 flex items-center justify-between">
                            <span className="text-gray-600 text-sm">
                                Change your password
                            </span>
                            <a className="text-blue-500 hover:text-blue-700 text-sm font-medium cursor-pointer hover:underline">
                                Edit
                            </a>
                        </div>
                    </div>
                    <div className="flex py-4 border-b border-gray-200">
                        <div className="flex-none w-36 flex items-center gap-2">
                            <span className="font-semibold text-gray-900 text-sm">Email</span>
                        </div>
                        <div className="flex-1 flex items-center justify-between">
                            <span className="text-gray-600 text-sm">
                                Change your email
                            </span>
                            <a className="text-blue-500 hover:text-blue-700 text-sm font-medium cursor-pointer hover:underline">
                                Edit
                            </a>
                        </div>
                    </div>
                    <div className="flex py-4">
                        <div className="flex-none w-36 flex items-center gap-2">
                            <span className="font-semibold text-gray-900 text-sm">Phone</span>
                        </div>
                        <div className="flex-1 flex items-center justify-between">
                            <span className="text-gray-600 text-sm">
                                Change your cell and work phone
                            </span>
                            <a className="text-blue-500 hover:text-blue-700 text-sm font-medium cursor-pointer hover:underline">
                                Edit
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
