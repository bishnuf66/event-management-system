import Footer from '@/app/components/Footer'
import Header from '@/app/components/Header'
import Login from '@/app/components/non_authenricated/Login'
import React from 'react'

export default function page() {
    return (
        <div className='flex flex-col min-h-screen'>
            <Header />
            <div className='flex flex-grow'> <Login /></div>
            <Footer />
        </div>
    )
}
