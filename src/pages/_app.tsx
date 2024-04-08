// pages/_app.tsx
import { AuthProvider } from '@/context/auth.context';
import '@/app/globals.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider> {/* Wrap your entire app with AuthProvider */}
            <Component {...pageProps} />
        </AuthProvider>
    );
}

export default MyApp;
