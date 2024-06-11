"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface EditModalProps {
    eventId: string | null;
    onClose: () => void;
    eventData: Event | null;
    fetchEvents: () => void;
}

interface Event {
    eventid: string;
    title: string;
    startdate: string;
    enddate: string;
    description: string;
    participants: string;
    location: string;
}

const EditModal: React.FC<EditModalProps> = ({ eventId, onClose, eventData, fetchEvents }) => {
    const [formData, setFormData] = useState<Event | null>(null);

    useEffect(() => {
        setFormData(eventData);
    }, [eventData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!formData) return;
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (!formData) throw new Error('Event data is missing.');
            const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/editevent/${eventId}`, formData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (response.status === 200) {
                toast.success("Event updated successfully")
                onClose();
                fetchEvents();
                console.log('Event updated successfully.');
            } else {
                toast.error("Failed updating event")
                console.error('Failed to update event:', response.data.message);
            }
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };

    return (

        <div className="px-20 py-20 fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500">
            <ToastContainer />
            <div className="text-black p-2 rounded-lg shadow-lg max-h-full overflow-y-auto w-80">
                <h2 className="text-grey-900 text-xl font-bold mb-2">Edit Event</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label htmlFor="title" className="block font-semibold">Title:</label>
                        <input type="text" id="title" name="title" value={formData?.title || ''} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-3 py-2" />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="participants" className="block font-semibold">Participants:</label>
                        <input type="text" id="participants" name="participants" value={formData?.participants || ''} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-3 py-2" />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="location" className="block font-semibold">Location:</label>
                        <input type="text" id="location" name="location" value={formData?.location || ''} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-3 py-2" />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="startdate" className="block font-semibold">Start Date:</label>
                        <input type="text" id="startdate" name="startdate" value={formData?.startdate || ''} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-3 py-2" />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="enddate" className="block font-semibold">End Date:</label>
                        <input type="text" id="enddate" name="enddate" value={formData?.enddate || ''} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-3 py-2" />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="description" className="block font-semibold">Description:</label>
                        <textarea id="description" name="description" value={formData?.description || ''} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-3 py-2 h-24" />
                    </div>
                    <div className="flex justify-end">
                        <button type="button" className="bg-gray-700 hover:bg-gray-900 text-gray-800 font-semibold py-2 px-4 mr-2 rounded" onClick={onClose}>Cancel</button>
                        <button type="submit" className="bg-gray-700 hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditModal;
