import Footer from '@/app/components/Footer'
import Header from '@/app/components/Header'
import React from 'react'
import CreateEvent from '@/app/components/authenticated/CreateEvent'

export default async function page() {
    return (
        <div className='flex flex-col min-h-screen'>
            <Header />
            <div className='flex flex-grow'>
                <CreateEvent />
            </div>
            <Footer />
        </div>
    )
}
