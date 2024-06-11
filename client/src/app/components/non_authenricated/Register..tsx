// components/Register.tsx

"use client"
import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios'
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

interface FormData {
    address: string,
    name: string,
    email: string;
    password: string;
    confirmPassword: string;
}

const Register = () => {
    const router = useRouter()
    const [formData, setFormData] = useState<FormData>({
        email: '',
        address: '',
        name: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Validation checks
        if (formData.password !== formData.confirmPassword) {
            alert('Password and confirm password do not match');
            return;
        }
        else {
            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/register`, formData,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );


                if (response.status == 200) {
                    toast.success(
                        "Registration completed.You can login now"
                    );
                    router.push('/home/login')
                }

                // Handle successful registration
                console.log('Registration successful');
            } catch (error: any) {
                toast.error(
                    "Registration failed."
                );
                console.error('Registration failed:', error.message);

            }
        }

        // Add your registration logic here
        console.log(formData); // For demonstration, logging form data
    };

    return (

        <div className="container mx-auto p-4 bg-gradient-to-r from-gray-500 to-gray-300 min-w-full ">
            <ToastContainer />

            <form onSubmit={handleSubmit} className="max-w-md mx-auto text-black w-full">
                <div className="text-gray-900 text-2xl font-bold mb-4">Register</div>
                <div className="mb-6">
                    <label htmlFor="name" className="block text-gray-800 font-bold mb-2">Name</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-800 font-bold mb-2">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>

                <div className="mb-6">
                    <label htmlFor="address" className="block text-gray-800 font-bold mb-2">Address</label>
                    <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-800 font-bold mb-2">Password</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-6">
                    <label htmlFor="confirmPassword" className="block text-gray-800 font-bold mb-2">Confirm Password</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <button type="submit" className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Register</button>

                <div className='py-4 flex flex-row'>Already have an account? <div className='text-green-900'><Link href="/home/login">Login</Link></div>
                </div>
            </form>
        </div>
    );
};

export default Register;
