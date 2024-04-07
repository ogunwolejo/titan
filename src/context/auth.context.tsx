import React, { createContext, useState, useEffect, useContext } from 'react';
import {onAuthStateChanged} from 'firebase/auth';
import {User} from "@firebase/auth";
import {auth} from "@/utils/config";

type IAuthContext = {
    user: User | undefined | null;
    loading: boolean;
};

const AuthContext: React.Context<IAuthContext> = createContext<IAuthContext>({
    user: undefined,
    loading: true,
});

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [user, setUser] = useState<User | null | undefined >(undefined);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user); // Set user based on the authentication state change
            setLoading(false); // Update loading state when authentication state changes
        });

        // Cleanup function to unsubscribe from the listener when the component unmounts
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => useContext<IAuthContext>(AuthContext);
