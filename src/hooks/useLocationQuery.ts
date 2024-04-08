import {useEffect, useState} from 'react';
import {Collections} from "@/utils/enum";
import {collection, onSnapshot, getDocs, query, where} from "firebase/firestore";
import {db} from "@/utils/config";
import {IReview} from "@/types/reviews.types";
import {useRouter} from "next/navigation";
import useFetchReviewStore from "@/store/review.store";

export const useLocationQuery = () => {
    const router = useRouter();
    const [location, setLocation] = useState<string>('');
    const [reviews, setReviews] = useState<IReview[]>([]);
    const [queryState, setQueryState] = useState<'error' | 'done' | 'fetching' | 'calm'>('calm');
    const {dispatchReviews, dispatchSearchedLocation} = useFetchReviewStore();

    const fetchReviewsHandle = async () => {
        try {
            setQueryState('fetching');
            // check for the location, fetch the location Id
            let locationId = '';
            const colRef = collection(db, Collections.LOCATION);
            const q = query(colRef, where("place", '==', location.toLowerCase()));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(el => {
                locationId = el.id;
            })

            // query the reviews based on the location id
            const reviewsData: IReview[] = []
            const revRef = collection(db, Collections.REVIEWS);
            const revQuery = query(revRef, where("searchedId", '==', locationId));
            //const revQuerySnapshot = await getDocs(revQuery);
            const unsubscribe = onSnapshot(revQuery, (querySnapshot) => {
                querySnapshot.forEach((el) => {
                    const reviews: IReview = {
                        id: el.id as string,
                        descriptions: el.data().descriptions as string,
                        rating: el.data().rating as number,
                        searchedId: el.data().searchedId as string, // the location whose review are looking for
                        tags: el.data().tags as string[],
                        anonymous: el.data().anonymous as boolean,
                        createdAt: el.data().createdAt,
                        createdBy: el.data().createdBy as string,
                        dislikes: el.data().dislikes ?? 0,
                        likes: el.data().likes ?? 0,
                    }
                    reviewsData.push(reviews);
                });
            });

            setReviews(reviewsData);
            setQueryState('done');
            return unsubscribe;

        } catch (e) {
            setQueryState('error');
            return e as Error;
        }
    }


    useEffect(() => {
        if (queryState == 'done') {
            dispatchReviews(reviews);
            dispatchSearchedLocation(location);
            router.push('/review')
        }


    }, [reviews, queryState]);

    // console.log('@@@', reviews, 'loading', queryState);

    return {location, setLocation, reviews, queryState, fetchReviewsHandle};

}