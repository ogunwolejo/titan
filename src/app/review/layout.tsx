import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";

const inter = Inter({ subsets: ["latin"], variable:'--inter' });

export const metadata: Metadata = {
    title: "Spotta",
};

export default function ReviewLayout({
   children,
}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className={`${inter.className} flex flex-col max-h-screen min-h-screen h-screen bg-[#F2F6FD]`}>
            {children}
        </div>
    );
}
