import type { Metadata } from "next";
import localFont from 'next/font/local'
import React from "react";
import Navbar from "@/components/molecules/navbar";

export const metadata: Metadata = {
    title: "Spotta | Auth",
    description: "Authentication",
};

const clash = localFont({
    src: '../../fonts/clashdisplaybold.otf',
    weight: '700',
    display: 'swap',
    variable: '--font-clash-display'
})
const AuthLayout = ({ children }: Readonly<{
    children: React.ReactNode;
}>)  => {
    return (
        <div className='flex flex-col min-h-full flex-1 mx-auto max-w-8xl px-8 sm:px-6 lg:px-24 py-5 bg-body-background'>
            <div className='flex justify-between items-center'>
                <div className={`${clash.variable} flex items-end space-x-1.5`}>
                    <span className='tracking-wider text-black uppercase font-extrabold text-[10px]'>Spotta</span>
                    <span className='bg-primary-light text-white border-1 py-1 px-1.5 uppercase text-[7px] font-semibold'>NG</span>
                </div>
                <div className='text-primary-light2 text-md font-semibold'>
                    Login
                </div>
            </div>
            <div className='flex flex-1'>
                {children}
            </div>
        </div>
    );
};

export default AuthLayout;