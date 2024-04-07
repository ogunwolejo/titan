import {db} from '@/utils/config';
import {
    type DocumentData,
    collection,
    doc,
    setDoc,
    type DocumentReference,
    updateDoc,
    addDoc,
    type CollectionReference,
} from 'firebase/firestore';
export const useFireStore = <T extends DocumentData>(path: string) => {
    const createDocument = async (data: T): Promise<DocumentReference | Error> => {
        try {
            const ref: CollectionReference = collection(db, path);
            const docRef: DocumentReference = await addDoc(ref, data);
            return docRef;
        } catch (error) {
            return error as Error;
        }
    };

    const setDocument = async (id: string, data: T): Promise<void | any> => {
        try {
            await setDoc(doc(db, path, id), data, {merge: true});
        } catch (error) {
            return error;
        }
    };

    const updateDocument = async (id: string, data: T): Promise<DocumentReference | Error> => {
        try {
            const docRef: DocumentReference = doc(db, path, id);
            await updateDoc(docRef, data);
            return docRef;
        } catch (error) {
            return error as Error;
        }
    };

    return {createDocument, updateDocument, setDocument};
};
