import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import Navbar from "@/components/molecules/navbar";

const inter = Inter({ subsets: ["latin"], variable:'--inter' });

export const metadata: Metadata = {
    title: "Spotta",
};

export default function HomeLayout({
   children,
}: Readonly<{
children: React.ReactNode; }>) {
    return (
        <div className={`${inter.className} flex flex-col flex-1 max-h-screen h-screen mx-auto max-w-8xl px-8 sm:px-6 lg:px-24 py-5`}>
            <Navbar/>
            <div className='flex flex-grow'>
                {children}
            </div>
        </div>
    )
}
