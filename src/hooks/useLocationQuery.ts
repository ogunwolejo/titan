import {useEffect, useState} from 'react';
import {Collections} from "@/utils/enum";
import {collection, doc, getDocs, query, where} from "firebase/firestore";
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
            console.log('@@@@@@', locationId);

            // query the reviews based on the location id
            const reviewsData: IReview[] = []
            const revRef = collection(db, Collections.REVIEWS);
            const revQuery = query(revRef, where("searchedId", '==', locationId));
            const revQuerySnapshot = await getDocs(revQuery);
            revQuerySnapshot.forEach(el => {
                const reviews: IReview = {
                    descriptions: el.data().descriptions as string,
                    rating: el.data().rating as number,
                    searchedId: el.data().searchedId as string, // the location whose review are looking for
                    tags: el.data().tags as string[],
                    anonymous: el.data().anonymous as boolean,
                    createdAt: el.data().createdAt,
                    createdBy: el.data().createdBy as string,
                }
                reviewsData.push(reviews);
            })

            setReviews(reviewsData);
            setQueryState('done');

        } catch (e) {
            console.log('@@@@@ error', (e as Error).message);
            setQueryState('error');
        }
    }

    useEffect(() => {
        if (queryState == 'done') {
            dispatchReviews(reviews);
            dispatchSearchedLocation(location);
            router.push('/review')
        }

        () => {
            setQueryState('calm');
        }
    }, [queryState]);

    // console.log('@@@', reviews, 'loading', queryState);

    return {location, setLocation, reviews, queryState, fetchReviewsHandle};

}