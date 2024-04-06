'use client'
import {AppForm} from "@/app/auth/common/app-form";
export default function AuthRegistrationHome() {
    return (
        <main className="flex flex-1 w-full flex-col items-center justify-center">
            <AppForm mode='signup' />
        </main>
    );
}
