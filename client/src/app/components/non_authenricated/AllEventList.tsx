// components/EventList.tsx
"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Event {
    eventid: string;
    title: string;
    location: string;
    startdate: string;
    enddate: string;
    description: string;
    participants: string;
}

function EventList() {
    const [events, setEvents] = useState<Event[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filterOption, setFilterOption] = useState<string>(''); // 'startDate', 'endDate', or 'name'
    const [sortBy, setSortBy] = useState<string>(''); // 'startDate', 'endDate', or 'name'

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/getallevents`);
                const eventData: Event[] = response.data.events; // Extract events from the 'events' property
                setEvents(eventData);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    // Filter events based on search query and filter option
    const filteredEvents = events.filter(event => {
        const lowerCaseQuery = searchQuery.toLowerCase();
        if (!filterOption || filterOption === 'name') {
            return event.title.toLowerCase().includes(lowerCaseQuery);
        } else if (filterOption === 'startDate') {
            return event.startdate.includes(searchQuery);
        } else if (filterOption === 'endDate') {
            return event.enddate.includes(searchQuery);
        }
        return true;
    });

    // Sort events by selected field
    const sortedEvents = [...filteredEvents].sort((a, b) => {
        if (sortBy === 'startDate') {
            return new Date(a.startdate).getTime() - new Date(b.startdate).getTime();
        } else if (sortBy === 'endDate') {
            return new Date(a.enddate).getTime() - new Date(b.enddate).getTime();
        } else if (sortBy === 'name') {
            return a.title.localeCompare(b.title);
        }
        return 0;
    });

    return (
        <div className='bg-gradient-to-r from-gray-500 to-gray-300 min-w-full p-4'>
            <div className='text-xl text-black p-2'><i className="material-icons">event</i> All Events</div>
            {/* Search input field */}
            <div className="p-3 text-black ">
                {/* Search input field */}
                <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border border-gray-400 rounded px-3 py-1 mr-2"
                />
                {/* Filter dropdown */}
                <select
                    value={filterOption}
                    onChange={(e) => setFilterOption(e.target.value)}
                    className="border text-white border-gray-400 rounded px-3 py-1 ml-2 bg-gray-700 hover:bg-gray-900"
                >
                    <option value="">
                        <i className="material-icons mr-2">filter_alt</i> Filter By
                    </option>
                    <option value="name">Name</option>
                    <option value="startDate">Start Date</option>
                    <option value="endDate">End Date</option>
                </select>
                {/* Sort dropdown */}
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-white border border-gray-400 rounded px-3 py-1 ml-2 bg-gray-700 hover:bg-gray-900"
                >
                    <option value="">
                        <i className="material-icons mr-2">sort</i> Sort By
                    </option>
                    <option value="name">Name</option>
                    <option value="startDate">Start Date</option>
                    <option value="endDate">End Date</option>
                </select>
            </div>
            {/* Event list */}
            <div className='text-black grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                {sortedEvents.map(event => (
                    <div key={event.eventid} className='bg-white rounded-lg shadow-xl p-4'>
                        <div><i className="material-icons">event_available</i> Event Title: {event.title}</div>
                        <div><i className="material-icons">people</i> Event Participants: {event.participants}</div>
                        <div><i className="material-icons">location_on</i> Event Location: {event.location}</div>
                        <div><i className="material-icons">schedule</i> Event Start Date: {event.startdate}</div>
                        <div><i className="material-icons">schedule</i> Event End Date: {event.enddate}</div>
                        <div><i className="material-icons">description</i> Event Description: {event.description}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default EventList;
