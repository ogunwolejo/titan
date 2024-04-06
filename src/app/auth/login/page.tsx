'use client';
import {AppForm} from "@/app/auth/common/app-form";
export default function AuthLoginHome() {

    return (
        <main className="flex flex-1 w-full flex-col justify-center items-center">
            <AppForm mode='login'/>
        </main>
    );
}
