import Footer from '@/app/components/Footer'
import Header from '@/app/components/Header'
import Register from '@/app/components/non_authenricated/Register.'
import React from 'react'

export default function page() {
    return (
        <div className='flex flex-col w-full min-h-screen'>
            <Header />
            <div className='flex flex-grow w-full'><Register /></div>
            <Footer />
        </div>
    )
}
