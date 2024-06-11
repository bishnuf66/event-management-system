"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditModal from './EditEventFrom';

interface Event {
    eventid: string;
    title: string;
    startdate: string;
    enddate: string;
    description: string;
    participants: string;
    location: string;
}

const EventList = () => {
    const token = localStorage.getItem('token');
    const [events, setEvents] = useState<Event[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editEventId, setEditEventId] = useState<string | null>(null);
    const [editEventData, setEditEventData] = useState<Event | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [sortType, setSortType] = useState<string>('');

    const fetchEvents = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/getuserevents`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const eventData: Event[] = response.data.userEvents;
            setEvents(eventData);
        } catch (error) {
            console.error('Error fetching events:', error);
            setError('Failed to fetch events.');
        }
    };

    useEffect(() => {
        if (token) {
            fetchEvents();
        } else {
            setError('No token found.');
        }
    }, [token]);

    const handleEditEvent = (eventId: string) => {
        const eventToEdit = events.find(event => event.eventid === eventId);
        if (eventToEdit) {
            setEditEventData(eventToEdit);
            setEditEventId(eventId);
            setShowEditModal(true);
        } else {
            console.error('Event not found for editing.');
        }
    };

    const handleDeleteEvent = async (eventId: string) => {
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/deleteevent/${eventId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                toast.success("Event deleted successfully");
                setEvents(events.filter(event => event.eventid !== eventId));
            } else {
                console.error('Failed to delete event:', response.data.message);
            }
        } catch (error) {
            console.error('Error deleting event:', error);
        }
        console.log(`Deleting event with ID ${eventId}`);
    };

    const sortByStartDate = () => {
        const sortedEvents = [...events].sort((a, b) => new Date(a.startdate).getTime() - new Date(b.startdate).getTime());
        setEvents(sortedEvents);
    };

    const sortByEndDate = () => {
        const sortedEvents = [...events].sort((a, b) => new Date(a.enddate).getTime() - new Date(b.enddate).getTime());
        setEvents(sortedEvents);
    };

    const sortByName = () => {
        const sortedEvents = [...events].sort((a, b) => a.title.localeCompare(b.title));
        setEvents(sortedEvents);
    };

    useEffect(() => {
        if (sortType === 'startDate') {
            sortByStartDate();
        } else if (sortType === 'endDate') {
            sortByEndDate();
        } else if (sortType === 'name') {
            sortByName();
        }
    }, [sortType]);

    const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='min-w-full bg-gradient-to-r from-gray-500 to-gray-300 p-4'>
            <ToastContainer />
            <div className='flex flex-row text-xl p-3 justify-between items-center'>
                <div className='text-gray-900 text-xl p-3 flex items-center'>
                    <span className="material-icons mr-2">event</span> Your Events
                </div>
                <div className="p-3 text-black flex items-center">
                    <span className="material-icons mr-2">search</span>
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border border-gray-400 rounded px-3 py-1"
                    />
                </div>
                <div className="p-3 text-white flex items-center">
                    <span className="material-icons mr-2">sort</span>
                    <select value={sortType} onChange={(e) => setSortType(e.target.value)} className="border border-gray-400 rounded px-3 py-1 bg-gray-700 hover:bg-gray-900">
                        <option value="">Sort By</option>
                        <option value="startDate">Start Date</option>
                        <option value="endDate">End Date</option>
                        <option value="name">Name</option>
                    </select>
                </div>
                <div className="bg-gray-700 hover:bg-gray-900 text-white font-bold m-3 focus:outline-none focus:shadow-outline w-45 h-12 flex items-center">
                    <Link href="/createevent" className="flex items-center">
                        <span className="material-icons mr-2">add</span> Create Event
                    </Link>
                </div>
            </div>

            <div className='text-black grid grid-cols-5 gap-4 rounded-lg shadow-lg'>
                {filteredEvents.map(event => (
                    <ul key={event.eventid} className='flex flex-col px-3 py-3 rounded-lg shadow-lg'>
                        <li className="flex items-center mb-2">
                            <span className="material-icons mr-2">title</span>Event Title: {event.title}
                        </li>
                        <li className="flex items-center mb-2">
                            <span className="material-icons mr-2">group</span>Event Participants: {event.participants}
                        </li>
                        <li className="flex items-center mb-2">
                            <span className="material-icons mr-2">location_on</span>Event Location: {event.location}
                        </li>
                        <li className="flex items-center mb-2">
                            <span className="material-icons mr-2">calendar_today</span>Event Start Date: {event.startdate}
                        </li>
                        <li className="flex items-center mb-2">
                            <span className="material-icons mr-2">calendar_today</span>Event End Date: {event.enddate}
                        </li>
                        <li className="flex items-center mb-2">
                            <span className="material-icons mr-2">description</span>Event Description: {event.description}
                        </li>
                        <div className="flex justify-between">
                            <button className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center mr-2" onClick={() => handleEditEvent(event.eventid)}>
                                <span className="material-icons mr-2">edit</span>
                                Edit
                            </button>
                            <button className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center mr-2" onClick={() => handleDeleteEvent(event.eventid)}>
                                <span className="material-icons mr-2">delete</span>
                                Delete
                            </button>
                        </div>
                    </ul>
                ))}
            </div>

            {showEditModal && editEventData && (
                <EditModal
                    eventId={editEventId}
                    onClose={() => setShowEditModal(false)}
                    eventData={editEventData}
                    fetchEvents={fetchEvents}
                />
            )}
        </div>
    );
};

export default EventList;
