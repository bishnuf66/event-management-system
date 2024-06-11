
"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


const Header = () => {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.setItem('token', "");;
        router.push('/home');
    };

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, [token]);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <header className="sticky top-0 bg-gray-800 shadow-md p-4 z-50">
            <nav className="container mx-auto flex flex-row justify-between items-center">
                <div className='bg-transparent text-white border border-white py-2 px-4 rounded-lg transition duration-300 ease-in-out hover:bg-white hover:text-black'> <Link
                    href={"/home/dashboard"}>Dashboard</Link></div>

                <div className="text-xl font-bold text-white">Event Management System</div>

                <div className="relative">
                    <button onClick={toggleDropdown} className="bg-transparent text-white border border-white py-2 px-4 rounded-lg transition duration-300 ease-in-out hover:bg-white hover:text-black">
                        <div > Setting</div>
                    </button>
                    {dropdownOpen && (
                        <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md">
                            {isLoggedIn ? (
                                <>
                                    <li>
                                        <Link href="/profile">

                                            <div className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Profile</div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/manageevents">
                                            <div className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Manage Events</div>
                                        </Link>
                                    </li>
                                    <li>
                                        <button onClick={handleLogout}>
                                            <div className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Logout</div>
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link href="/home/login">
                                            <div className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Login</div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/home/register">
                                            <div className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Register</div>
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
