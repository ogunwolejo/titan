import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {
    getFirestore,
    initializeFirestore,
    type FirestoreSettings,
    persistentLocalCache,
    persistentMultipleTabManager,
    CACHE_SIZE_UNLIMITED,
} from 'firebase/firestore';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyABBceF-mY3N9PJoYVf3cjuVTwXYkL1N28",
    authDomain: "titan-3557d.firebaseapp.com",
    projectId: "titan-3557d",
    storageBucket: "titan-3557d.appspot.com",
    messagingSenderId: "475460641331",
    appId: "1:475460641331:web:51c8a5b25dfd58442ab946",
    measurementId: "G-CSYZGTQ0H3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Enable Offline Operations
const firestoreSetting: FirestoreSettings = {
    localCache: persistentLocalCache({
        cacheSizeBytes: CACHE_SIZE_UNLIMITED,
        tabManager: persistentMultipleTabManager(),
    }),
};

initializeFirestore(app, firestoreSetting);
export const auth = getAuth(app);
export const db = getFirestore(app);