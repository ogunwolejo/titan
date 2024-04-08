'use client';
import {useState, useMemo, ChangeEvent, FormEvent} from "react";
import {
    Dialog,
    DialogContent,
    DialogClose,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/atoms/ui/dialog";
import {ReactNode} from "react";
import {Textarea} from "@/components/atoms/ui/textarea";
import {Checkbox} from "@/components/atoms/ui/checkbox";
import {Button} from "@/components/atoms/ui/button";
import SelectDropdown from 'react-dropdown-select';
import {cn} from "@/utils/cn";
import Star from 'react-star-rating-component';
import {useFireStore} from '@/hooks/useFirestore';
import {Collections} from "@/utils/enum";
import {collection, getDocs, query, where} from "firebase/firestore";
import {auth, db} from "@/utils/config";
import {ILocation} from "@/types/location";
import {Timestamp} from "@firebase/firestore";
import useFetchReviewStore from "@/store/review.store";

type IReview = {
    searchedId: string;
    rating: number;
    tags: string [];
    description: string;
    anonymous: boolean;
    createdBy: string | null;
}

const ReviewModal: React.FC<{children: ReactNode; searchedId: string}> = ({children, searchedId}) => {
    const {createDocument} = useFireStore(Collections.REVIEWS);
    const locationDoc = useFireStore(Collections.LOCATION);
    const {locationSearched} = useFetchReviewStore();
    const [postReview, setPostReview] = useState<IReview>({
        rating: 0,
        anonymous: false,
        description: '',
        tags: ['schools', 'Hospitals', 'Airport', 'Train station', 'Night life'],
        searchedId: '',
        createdBy: ''
    });
    const isDisabled: boolean = useMemo(() => ((postReview.tags.length > 0 && postReview.description.trim().length > 0)), [postReview.tags, postReview.description]);
    const onStarClickHandle = (nxtNumber: number, prevNum: number, name: string) => {
        setPostReview(p => ({
            ...p,
            rating: nxtNumber,
        }))
    };

    const postReviewHandler = async() => {
        try {
            const colRef = collection(db, Collections.LOCATION);
            const q = query(colRef, where("place", '==', locationSearched.toLowerCase()));
            const querySnapshot = await getDocs(q);
            let locationId = '';
            querySnapshot.forEach(el => {
                locationId = el.id;
            })

            console.log('location Id 1', locationId);

            if (locationId.length === 0) {
                // create a location document in firebase
                let loc: ILocation = {
                    createdAt: Timestamp.now(),
                    place: searchedId?.toLowerCase() ?? locationSearched.toLowerCase(),
                }

                const newDoc = await locationDoc.createDocument(loc);
                if(newDoc instanceof Error) {
                    throw newDoc;
                }
                locationId = newDoc.id;
            }

            // setPostReview(p => ({
            //     ...p,
            //     searchedId: locationId
            // }))

            console.log('location Id 2', locationId);

            const reviews = await createDocument({
                ...postReview,
                searchedId: locationId,
            });
            if (reviews instanceof Error) {
                throw reviews;
            } else {
                // Redirection
            }
        } catch (e) {
            console.log((e as Error).message);
        }
    }

    return (
        <Dialog>
            <DialogTrigger className='' >{children}</DialogTrigger>
            <DialogContent className='w-full lg:w-min-[695px] space-y-3'>
                <DialogHeader >
                    <DialogTitle className='text-center text-black2 font-normal text-title-sm'>Review Location</DialogTitle>
                </DialogHeader>
                <SelectDropdown
                    className={cn(
                        "flex lg:h-[50px] w-full rounded-md border-2 border-input bg-[#F3F7FE] p-3 text-sm ring-offset-0 placeholder:text-black focus-visible:outline-none font-[400]"
                    )}
                    placeholder='Select Amenities'
                    dropdownHeight=''
                    values={[]}
                    options={[]}
                    onChange={function (value: {}[]): void {
                        throw new Error("Function not implemented.");
                    }}
                />
                <div>
                    <p className='text-black2 font-medium text-title-xsm'>Rate location</p>
                    <Star name='rate2'  value={postReview.rating} starCount={5} editing={true} onStarClick={onStarClickHandle}/>
                </div>
                <Textarea rows={5} cols={12} className='h-48 border-1' placeholder='placeholder' onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setPostReview(p => ({
                    ...p,
                    description: e.target.value,
                }))}/>
                <div className='flex flex-row justify-start items-center gap-1'>
                    <Checkbox
                        checked={postReview.anonymous}
                        onCheckedChange={(isChecked) => {
                            // @ts-ignore
                            setPostReview(p => {
                                return ({
                                    ...p,
                                    anonymous: isChecked,
                                    createdBy: auth.currentUser?.uid ?? null,
                                });
                            })
                        }}
                    />
                    <span className='font-normal text-title-xsm text-[#484851]'>Post as Anonymous</span>
                </div>
                <div className='flex flex-col md:flex-row w-full gap-2'>
                    <Button variant='default' className='bg-primary md:h-[50px] p-2 uppercase text-white md:w-1/2' disabled={!isDisabled} onClick={postReviewHandler}>Submit</Button>
                    <DialogClose asChild>
                        <Button variant='outline' className='bg-white md:h-[50px] p-2 border-[0.5px] border-primary uppercase text-primary md:w-1/2'>Cancel</Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ReviewModal;