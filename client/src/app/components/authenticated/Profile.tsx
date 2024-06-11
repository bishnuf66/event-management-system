"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';

interface UserData {
    name: string;
    email: string;
    address: string;
}

const Profile = () => {
    const token = localStorage.getItem('token');
    const [user, setUser] = useState<UserData | null>(null);
    console.log(user);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/profile`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data.user);
                console.log(response.data.user);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUser();
    }, [token]);

    return (
        <div className='text-black flex flex-col justify-start p-4 bg-gradient-to-r from-gray-500 to-gray-300 min-w-full'>
            <h1 className='text-2xl flex flex-row items-center mb-4'>
                <span className="material-icons mr-2">person</span>
                Your Profile
            </h1>
            {user ? (
                <div>
                    <p className='flex items-center mb-2'>
                        <span className="material-icons mr-2">person</span>
                        Name: {user.name}
                    </p>
                    <p className='flex items-center mb-2'>
                        <span className="material-icons mr-2">email</span>
                        Email: {user.email}
                    </p>
                    <p className='flex items-center mb-2'>
                        <span className="material-icons mr-2">home</span>
                        Address: {user.address}
                    </p>
                </div>
            ) : (
                <p className='flex items-center'>
                    <span className="material-icons mr-2">hourglass_empty</span>
                    Loading user data
                </p>
            )}
        </div>
    );
};

export default Profile;
