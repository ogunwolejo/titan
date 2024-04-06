'use client'
import React from "react";
import localFont from "next/font/local";
import Link from 'next/link'

const clash = localFont({
    src: '../../fonts/clashdisplaybold.otf',
    weight: '700',
    display: 'swap',
    variable: '--font-clash-display'
})

export default function Navbar() {
    return (
        <div className='flex justify-between items-center'>
            <div className={`${clash.variable} flex items-end space-x-1.5`}>
                <span className='tracking-wider text-black uppercase font-extrabold text-[10px]'>Spotta</span>
                <span
                    className='bg-primary-light text-white border-1 py-1 px-1.5 uppercase text-[7px] font-semibold'>NG</span>
            </div>
            <div className='text-primary-light2 text-md font-semibold'>
                Login
            </div>
        </div>
    )
}