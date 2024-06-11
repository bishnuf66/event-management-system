
import EventList from '@/app/components/authenticated/EventList'
import ManageEvents from '@/app/components/authenticated/CreateEvent'
import Footer from '@/app/components/Footer'
import Header from '@/app/components/Header'

import React from 'react'

export default async function page() {
    return (
        <div className='flex flex-col min-h-screen'>
            <Header />
            <div className='flex flex-grow'>
                <EventList />
            </div>
            <Footer />
        </div>
    )
}
