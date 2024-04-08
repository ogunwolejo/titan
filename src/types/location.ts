import {Timestamp} from "@firebase/firestore";

export type ILocation = {
    place: string;
    createdAt: Timestamp;
}