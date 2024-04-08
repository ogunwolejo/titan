'use client'
import React from "react";
import localFont from "next/font/local";
import {useAuth} from "@/context/auth.context";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/atoms/ui/avatar";
import {auth} from '@/utils/config';
import {useRouter} from "next/navigation";
import {Button} from "@/components/atoms/ui/button";

const clash = localFont({
    src: '../../fonts/clashdisplaybold.otf',
    weight: '700',
    display: 'swap',
    variable: '--font-clash-display'
})

export default function Navbar() {
    const router = useRouter();
    const {user, loading} = useAuth();
    console.log('@@@ user', user)
    return (
        <div className='flex justify-between items-center'>
            <div className={`${clash.variable} flex items-center space-x-.5`}>
                <Button variant='link' onClick={() => router.push('/homepage')} className='no-underline tracking-wider text-black uppercase font-extrabold text-[10px]'>
                    Spotta
                </Button>
                <span
                    className='bg-primary-light text-white border-1 py-1 px-1.5 uppercase text-[7px] font-semibold'>NG</span>
            </div>
            {
                !user ? (
                    <Button variant='link' onClick={() => router.push('/auth/login')} className='no-underline text-primary-light2 text-md font-semibold'>
                        Login
                    </Button>
                ) : (
                    <Avatar className='w-6 h-6'>
                        {auth.currentUser?.photoURL && <AvatarImage src={auth.currentUser.photoURL}/>}
                        <AvatarFallback></AvatarFallback>
                    </Avatar>
                )
            }
        </div>
    )
}