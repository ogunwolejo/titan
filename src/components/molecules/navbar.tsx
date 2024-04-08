'use client'
import React, {useMemo} from "react";
import localFont from "next/font/local";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/atoms/ui/avatar";
import {auth} from '@/utils/config';
import {useRouter} from "next/navigation";
import {Button} from "@/components/atoms/ui/button";
import useAuthStore from "@/store/auth";

const clash = localFont({
    src: '../../fonts/clashdisplaybold.otf',
    weight: '700',
    display: 'swap',
    variable: '--font-clash-display'
})

export default function Navbar() {
    const router = useRouter();
    const {user} = useAuthStore();
    const nameAbbreviation: string | undefined = useMemo(() => {
        if (!auth.currentUser || !auth.currentUser.displayName) {
            return undefined;
        }

        const fullName: string[] = auth.currentUser.displayName.split(' ');
        const abbreviatedFirstName: string = fullName[0][0].toUpperCase();
        return abbreviatedFirstName;
    }, [auth.currentUser]);
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
                    <div className='flex flex-row-reverse justify-start items-center gap-1'>
                        <Avatar className='w-6 h-6 md:w-8 md:h-8 text-white'>
                            {(auth.currentUser?.photoURL && true) && <AvatarImage src={auth.currentUser.photoURL}/>}
                            <AvatarFallback>{nameAbbreviation}</AvatarFallback>
                        </Avatar>
                        <div className='text-title-xsm text-black2 capitalize font-medium'>Welcome!</div>
                    </div>
                )
            }
        </div>
    )
}