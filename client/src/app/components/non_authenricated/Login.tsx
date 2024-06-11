"use client"
import axios from 'axios';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useRouter } from 'next/navigation';
import Link from 'next/link';


interface FormData {
    email: string;
    password: string;
}

const Login = () => {
    const router = useRouter()
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (response.status == 200) {
                toast.success("log in successful");
                router.push('/home/dashboard')

            }
            const data = await response.data;
            const token = data.token;
            localStorage.setItem('token', token);



        } catch (error) {
            toast.error("Login Failed! Invalid email or password")
            console.log('Error occured', error);
        }
    };


    return (
        <div className="container mx-auto p-4 bg-gradient-to-r from-gray-500 to-gray-300 min-w-full">
            <ToastContainer />

            <form onSubmit={handleSubmit} className="max-w-md mx-auto text-black">
                <div className="text-gray-900 text-2xl font-bold mb-4">Login</div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-800 font-bold mb-2">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-800 font-bold mb-2">Password</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <button type="submit" className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Login</button>
                <div className='py-4 flex flex-row'>Don&#39;t have an account?<div className='text-green-900'> <Link href="/home/register">Register</Link>
                </div>
                </div>
            </form>

        </div>

    );
};

export default Login;
