export type IReview = {
    id?: string;
    rating: number;
    createdAt: Date;
    createdBy: string;
    descriptions: string;
    tags:string [];
    anonymous?: boolean;
    searchedId: string;
    likes?: number;
    dislikes?: number;
}