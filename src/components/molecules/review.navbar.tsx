'use client'
import React, {useMemo} from "react";
import localFont from "next/font/local";
import {MagnifyingGlassIcon, XMarkIcon} from "@heroicons/react/24/outline";
import {Input} from "@/components/atoms/ui/input";
import {Button} from '@/components/atoms/ui/button';
import ReviewModal from "@/app/review/common/modal";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/atoms/ui/carousel"
import NavCard from "@/components/molecules/navcard";
import {cn} from '@/utils/cn';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/atoms/ui/avatar";
import {auth} from "@/utils/config";
import {useRouter} from "next/navigation";
import useAuthStore from "@/store/auth";
import {IReview} from "@/types/reviews.types";

const clash = localFont({
    src: '../../fonts/clashdisplaybold.otf',
    weight: '700',
    display: 'swap',
    variable: '--font-clash-display'
})

type ReviewNavbar = {
    className?: string;
    reviews: IReview [];
    queryLocation: string;
    reviewsCount: number;
}
const subNavs: string[] = ['schools', 'hospitals', 'bus station', 'airport', 'night life', 'public wifi', 'parking lot', 'security', 'public transport', 'quiet'];
export default function ReviewNavbar({className, reviewsCount, queryLocation, reviews}: ReviewNavbar) {
    const router = useRouter();
    const {user} = useAuthStore();
    const nameAbbreviation: string | undefined = useMemo(() => {
        if (!auth.currentUser || !auth.currentUser.displayName) {
            return undefined;
        }

        const fullName: string[] = auth.currentUser.displayName.split(' ');
        const abbreviatedFirstName: string = fullName[0][0].toUpperCase();
        return abbreviatedFirstName;
    }, [auth.currentUser]);

    return (
        <div className={cn('mx-full max-w-8xl sm:px-6 lg:px-24 pt-3 lg:pt-3 pb-3', className)}>
            <div className='flex justify-between items-center gap-2'>
                <div className={`${clash.variable} flex items-center`}>
                    <Button variant='link' onClick={() => router.push('/homepage')} className='no-underline tracking-wider text-black uppercase font-extrabold text-[10px] pr-0'>
                        Spotta
                    </Button>
                    <span
                        className='bg-primary-light text-white border-1 py-.5 px-1.5 uppercase text-[7px] font-semibold '>NG</span>
                </div>
                <div className='max-w-sm md:max-w-xl w-full'>
                    <div className='relative'>
                        <div
                            className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 border-2 border-input bg-[#FBFAFC] rounded-md border-r-0'>
                            <MagnifyingGlassIcon className='h-4 w-4 text-[#3366FF]' aria-hidden='true'/>
                        </div>
                        <Input
                            id='search'
                            name='search'
                            className='w-full pl-10 pr-3 bg-[#FBFAFC]'
                            placeholder='Enter Address'
                            type='search'
                            value={queryLocation}

                        />
                        <div
                            className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 border-2 border-input bg-[#FBFAFC rounded-md border-l-0'>
                            <XMarkIcon className='h-4 w-4 text-[#0D2159]'  aria-hidden='true'/>
                        </div>
                    </div>
                </div>
                {
                    !user ? (
                        <Button variant='link' onClick={() => router.push('/auth/login')} className='no-underline text-primary-light2 text-md font-semibold'>
                            Login
                        </Button>
                    ) : (
                        <div className='flex flex-row-reverse justify-start items-center gap-1'>
                            <Avatar className='w-6 h-6 md:w-8 md:h-8 text-white'>
                                {(auth.currentUser?.photoURL && true) && <AvatarImage src={auth.currentUser.photoURL}/>}
                                <AvatarFallback>{nameAbbreviation}</AvatarFallback>
                            </Avatar>
                            <div className='text-title-xsm text-black2 capitalize font-medium'>Welcome!</div>
                        </div>
                    )
                }
            </div>

            <div className='flex flex-col items-center gap-2 md:gap-0 md:flex-row justify-between pt-2 pb-2'>
                <div>
                    <h3 className='text-black2 font-bold capitalize text-title-sm text-center md:text-start md:text-[24px] tracking-widest '>
                        {queryLocation}
                    </h3>
                    <h6 className='font-semibold text-title-xsm text-[#18181B]'>
                        {`“` + reviewsCount + `”`} Reviews <span className='font-normal'>(People are raving about the selected location)</span>
                    </h6>
                </div>

                {reviewsCount > 0 && <div className='flex justify-start gap-1.5 items-end'>
                    <ReviewModal searchedId=''>
                        <Button className='bg-primary text-white font-normal text-[10px] md:text-[16px] uppercase px-4 md:px-4 md:py-2 md:h-[50px] leading-5 rounded-md border-transparent'>Leave a review</Button>
                    </ReviewModal>
                    <Button variant='outline'  className='border-primary bg-transparent text-[10px] md:text-[16px] uppercase px-4 md:px-4 md:py-2 border-2 md:h-[50px]'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="transparent" viewBox="0 0 24 24" stroke-width="1"
                             stroke="#3168FF" className="w-4 h-16 border-primary">
                            <path stroke-linecap="round"
                                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"/>
                        </svg>
                    </Button>
                    <Button variant='outline'
                            className='border-primary bg-transparent text-[10px] md:text-[16px] uppercase px-4 md:px-4 md:py-2 border-2 md:h-[50px]'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="transparent" viewBox="0 0 24 24" stroke-width="1"
                             stroke="#3168FF" className="w-4 h-16 border-primary">
                            <path stroke-linecap="round"
                                  d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"/>
                        </svg>
                    </Button>
                </div>}
            </div>
            <div className='hidden lg:block'>
                <Carousel
                    opts={{
                        align: 'start'
                    }}
                    orientation='horizontal'
                    className='w-full max-w-full'
                >
                    <CarouselContent className=''>
                        {
                            subNavs.map((s, idx: number) => (
                                <CarouselItem className="basis-4/12 md:basis-1/12" key={idx}>
                                    <NavCard s={s}/>
                                </CarouselItem>
                            ))
                        }
                    </CarouselContent>
                    <CarouselNext />
                </Carousel>
            </div>
        </div>
    )
}