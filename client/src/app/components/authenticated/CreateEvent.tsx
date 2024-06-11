"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface FormData {
    title: string;
    participants: number;
    startdate: string; // Assuming startdate and enddate are of type string
    enddate: string;
    description: string;
    location: string;
}

const CreateEvent = () => {
    const token = localStorage.getItem('token');
    const router = useRouter();
    const [formData, setFormData] = useState<FormData>({
        title: '',
        participants: 0,
        startdate: '',
        enddate: '',
        description: '',
        location: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        // Validation checks
        if (!formData.title) {
            alert('Event title is required');
            return;
        }

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/createevent`, formData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                toast.success("Event Created Successfully");
                router.push('/home/dashboard');
            }
        } catch (error: any) {
            toast.error("Event Creation Failed.");
            console.error('Registration failed:', error.message);
        }

        console.log(formData); // For demonstration, logging form data
    };

    return (
        <div className="container mx-auto p-3 bg-gradient-to-r from-gray-500 to-gray-300 min-w-full">
            <ToastContainer />
            <h1 className="text-gray-900 text-3xl font-bold mb-3">Create Your Event</h1>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="mb-6 flex items-center">
                    <span className="material-icons mr-2 text-gray-700">edit</span>
                    <label htmlFor="title" className="block text-gray-700 font-bold mb-1">Event Title</label>
                </div>
                <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required className="ml-2 mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                <div className="mb-4 flex items-center">
                    <span className="material-icons mr-2 text-gray-700">group</span>
                    <label htmlFor="participants" className="block text-gray-700 font-bold mb-1">Number of Participants</label>
                </div>
                <input type="number" id="participants" name="participants" value={formData.participants} onChange={handleChange} required className="ml-2 mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                <div className="mb-4 flex items-center">
                    <span className="material-icons mr-2 text-gray-700">place</span>
                    <label htmlFor="location" className="block text-gray-700 font-bold mb-1">Event Location</label>
                </div>
                <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required className="ml-2 mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                <div className="mb-6 flex items-center">
                    <span className="material-icons mr-2 text-gray-700">event</span>
                    <label htmlFor="startdate" className="block text-gray-700 font-bold mb-1">Event Start Date</label>
                </div>
                <input type="date" id="startdate" name="startdate" value={formData.startdate} onChange={handleChange} required className="ml-2 mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                <div className="mb-4 flex items-center">
                    <span className="material-icons mr-2 text-gray-700">event</span>
                    <label htmlFor="enddate" className="block text-gray-700 font-bold mb-1">Event End Date</label>
                </div>
                <input type="date" id="enddate" name="enddate" value={formData.enddate} onChange={handleChange} required className="ml-2 mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                <div className="mb-6 flex items-center">
                    <span className="material-icons mr-2 text-gray-700 mt-1">description</span>
                    <label htmlFor="description" className="block text-gray-700 font-bold mb-1">Description</label>
                </div>
                <textarea id="description" name="description" value={formData.description} onChange={handleChange} required rows={4} className="ml-2 mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                <button type="submit" className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Create Event</button>
            </form>
        </div>
    );
};

export default CreateEvent;
