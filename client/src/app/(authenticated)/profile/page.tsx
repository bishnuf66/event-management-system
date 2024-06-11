import Footer from '@/app/components/Footer'
import Header from '@/app/components/Header'
import React from 'react'
import Profile from '@/app/components/authenticated/Profile'

export default async function Page() {
    return (
        <div className='flex flex-col min-h-screen'>
            <Header />
            <div className='flex flex-grow'>
                <Profile />
            </div>
            <Footer />
        </div>

    )
}
