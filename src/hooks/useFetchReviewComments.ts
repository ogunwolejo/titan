import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from "@/utils/config";
import {Collections} from "@/utils/enum";
import {Timestamp} from "@firebase/firestore";
import {useFireStore} from "@/hooks/useFirestore";
import {useState} from "react";

export type IComment = {
    createdAt: Timestamp;
    comments: string;
    review: string;
}
const {createDocument} = useFireStore(Collections.COMMENT);
export const useFetchReviewComments = () => {
    const [loading, setLoading] = useState<'fetching' | 'done' | 'calm'>('calm');
    const countComment = async (reviewId: string): Promise<number | Error> => {
        setLoading('fetching')
        try {
            const colRef = collection(db, Collections.COMMENT);
            const q = query(colRef, where("review", '==', reviewId));
            const querySnapshot = await getDocs(q);
            return querySnapshot.size;
        } catch (e) {
            return e as Error;
        } finally {
            setLoading('done')
        }
    }

    const postNewComment = async (c: IComment) => {
        setLoading('fetching')
        try {
            const newDoc = await createDocument(c);
            if (newDoc instanceof  Error) {
                throw newDoc;
            }
            return newDoc.id;
        } catch (e) {
            return e as Error;
        }
        finally {
            setLoading('done')
        }
    }

    return {postNewComment, countComment, loading};
}