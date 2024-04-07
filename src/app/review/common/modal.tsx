'use client';
import {useState, useMemo} from "react";
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

type IReview = {
    rating: number;
    tags: string [];
    description: string;
    anonymous: boolean;
}

const ReviewModal: React.FC<{children: ReactNode}> = ({children}) => {
    const [postReview, setPostReview] = useState<IReview>({
        rating: 0,
        anonymous: false,
        description: '',
        tags: [],
    });
    const isDisabled: boolean = useMemo(() => postReview.tags.length > 0 && postReview.description.trim().length > 0, [postReview.tags, postReview.description]);

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
                    <Star name='rate2'  value={3} starCount={5} editing={true} />
                </div>
                <Textarea rows={5} cols={12} className='h-48 border-1' placeholder='placeholder'/>
                <div className='flex flex-row justify-start items-center gap-1'>
                    <Checkbox />
                    <span className='font-normal text-title-xsm text-[#484851]'>Post as Anonymous</span>
                </div>
                <div className='flex flex-col md:flex-row w-full gap-2'>
                    <Button variant='default' className='bg-primary md:h-[50px] p-2 uppercase text-white md:w-1/2' disabled={isDisabled}>Submit</Button>
                    <DialogClose asChild>
                        <Button variant='outline' className='bg-white md:h-[50px] p-2 border-[0.5px] border-primary uppercase text-primary md:w-1/2'>Cancel</Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ReviewModal;