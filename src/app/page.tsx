'use client';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "@/utils/config";
import useAuthStore from "@/store/auth";

export default function Page() {
    const [state, setState] = useState<boolean>(true);
    const router = useRouter();
    const {dispatchUser} = useAuthStore();

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            console.log('@@@@@@ onAuth', user);
            if (!user) {
                setState(false);
                router.push('/homepage');
                return;
            }

            dispatchUser(user);
            router.push('/homepage');
        });
    }, []);

    if (state) {
        return <div className='flex flex-col justify-center h-full max-full items-center space-y-4'>
            <div className='bp-loader'></div>
        </div>
    }

}