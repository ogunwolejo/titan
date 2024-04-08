import {create} from 'zustand';
import {devtools} from 'zustand/middleware';
import {IReview} from "@/types/reviews.types";

type ReviewsState = {
    locationSearched: string;
    reviews: IReview[];
    dispatchReviews: (reviews: IReview[]) => void;
    dispatchSearchedLocation: (location: string) => void;
};

const useFetchReviewStore = create<ReviewsState>()(
    devtools((set) => ({
        locationSearched: '',
        reviews: [],
        dispatchReviews(reviews) {
            set((state) => ({...state, reviews}));
        },
        dispatchSearchedLocation(s) {
            set((state) => ({...state, locationSearched: s}));
        }
    })),
);

export default useFetchReviewStore;
