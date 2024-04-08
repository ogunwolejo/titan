export type IReview = {
    rating: number;
    createdAt: Date;
    createdBy: string;
    descriptions: string;
    tags:string [];
    anonymous?: boolean;
    searchedId: string;
}