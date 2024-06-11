import React from 'react'
import Link from 'next/link'
import Image from "next/image";

export default function Home() {
    return (
        <div className='flex flex-row felx grow justify-center items-center min-h-screen'>
            <div className='px-4 min-h-screen  w-screen flex flex-col felx grow justify-center items-center' >
                <div className='absolute w-1/2 h-screen brightness-75'><Image
                    src={"/e2.jpg"}
                    layout='fill'
                    className=" object-cover"
                    alt="login bg image"
                />
                    <div className="absolute inset-0 bg-black opacity-25"></div>
                    <div className="absolute inset-0 backdrop-filter backdrop-blur-md"></div>
                </div>
                <div className=' text-center relative indent-0 backdrop-filter backdrop-blur-lg w-64 h-19'>
                    <Link href="/home/dashboard">
                        <div className='text-white text-3xl'>  See Events</div>
                    </Link>
                </div>
            </div>
            <div className='  flex flex-col min-h-screen w-screen   justify-center items-center px-4 '>

                <div className='absolute w-1/2 h-screen'> <Image
                    src={"/e.jpg"}
                    layout='fill'
                    className=" object-cover"
                    alt="login bg image"
                />
                    <div className="absolute inset-0 bg-black opacity-25"></div>
                    <div className="absolute inset-0 backdrop-filter backdrop-blur-md"></div>
                </div>

                <div className='relative indent-0'>

                    <div className='py-2 text-center  backdrop-filter backdrop-blur-lg w-64 h-19'>
                        <Link href="/home/login">
                            <div className='text-white text-3xl'> Login </div>
                        </Link>
                    </div>

                    <div className='py-2 text-center text-black text-2xl'>
                        or
                    </div>

                    <div className='py-2 text-center  backdrop-filter backdrop-blur-lg w-64 h-19 ' >
                        <Link href="/home/register">
                            <div className='text-white text-3xl'>   Register</div>
                        </Link>
                    </div>
                </div>
            </div>


        </div >
    )
}
