import type { Metadata } from "next";
import localFont from 'next/font/local'
import React from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/atoms/ui/avatar";
import {auth} from "@/utils/config";
import {useRouter} from "next/navigation";
import {Button} from "@/components/atoms/ui/button";

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
    // const router = useRouter();
    return (
        <div className='flex flex-col min-h-full flex-1 mx-auto max-w-8xl px-8 sm:px-6 lg:px-24 py-5 bg-body-background'>
            <div className='flex justify-between items-center'>
                <div className={`${clash.variable} flex items-end space-x-1.5`}>
                    <span className='tracking-wider text-black uppercase font-extrabold text-[10px]'>Spotta</span>
                    <span className='bg-primary-light text-white border-1 py-1 px-1.5 uppercase text-[7px] font-semibold'>NG</span>
                </div>
                {/*{*/}
                {/*    !auth ? (*/}
                {/*        <Button variant='link' onClick={() => router.push('/auth/login')} className='no-underline text-primary-light2 text-md font-semibold'>*/}
                {/*            Login*/}
                {/*        </Button>*/}
                {/*    ) : (*/}
                {/*        <Avatar className='w-6 h-6'>*/}
                {/*            {auth.currentUser?.photoURL && <AvatarImage src={auth.currentUser.photoURL}/>}*/}
                {/*            <AvatarFallback></AvatarFallback>*/}
                {/*        </Avatar>*/}
                {/*    )*/}
                {/*}*/}
            </div>
            <div className='flex flex-1'>
                {children}
            </div>
        </div>
    );
};

export default AuthLayout;