import {app, auth, db} from '@/utils/config';
import {
    sendPasswordResetEmail,
    updatePassword,
    signInWithEmailAndPassword,
    type UserCredential,
    GoogleAuthProvider,
    signInWithPopup,
    type OAuthCredential,
    createUserWithEmailAndPassword,
    updateProfile,
    sendEmailVerification,
    type User,
} from 'firebase/auth';
import {FirebaseError} from 'firebase/app';
import {CreateUserAccount, LoginCredentials} from "@/types/auth.types";

export const emailPasswordLoginHandler = async (cred: LoginCredentials): Promise<UserCredential | FirebaseError> => {
    try {
        const userCredential: UserCredential = await signInWithEmailAndPassword(auth, cred.email, cred.password);
        console.log('@@@ login email and password', userCredential);
        return userCredential;
    } catch (error) {
        return error as FirebaseError;
    }
};

export const googleProvider = async (): Promise<UserCredential | FirebaseError> => {
    try {
        const provider = new GoogleAuthProvider();
        const popupResult: UserCredential = await signInWithPopup(auth, provider);
        const cred: OAuthCredential | undefined = GoogleAuthProvider.credentialFromResult(popupResult) ?? undefined;
        if (!cred) {
            throw new Error('Invalid credential ' + cred);
        }

        return popupResult;
    } catch (error) {
        return error as FirebaseError;
    }
};

export const loginViaGoogleProvider = async (): Promise<User | FirebaseError> => {
    try {
        const cred = await googleProvider();
        if (cred instanceof FirebaseError) {
            throw cred;
        } else if (cred.user.metadata.creationTime === cred.user.metadata.lastSignInTime) {
            throw new Error('User account does not exist');
        } else {
            console.log('@@@ login by google', cred);
            return cred.user;
        }
    } catch (error) {
        return error as FirebaseError;
    }
};

export const createUserAccountViaGoogleProvider = async (): Promise<User | FirebaseError> => {
    try {
        const cred = await googleProvider();
        if (cred instanceof FirebaseError) {
            throw cred;
        } else {
            console.log('@@@ create account by google', cred);
            return cred.user;
        }
    } catch (error) {
        return error as FirebaseError;
    }
};

export const createUserAccount = async (cred: CreateUserAccount): Promise<User | FirebaseError> => {
    try {
        const createUser: UserCredential = await createUserWithEmailAndPassword(auth, cred.email, cred.password);
        if (createUser) {
            await updateProfile(createUser.user, {
                displayName: `${cred.firstName} ${cred.lastName}`,
            });
            await sendEmailVerification(createUser.user);
            console.log('@@@ create account', createUser);
            return createUser.user;
        }

        throw new Error('User Account not Created, try again later');
    } catch (error) {
        return error as FirebaseError;
    }
};
