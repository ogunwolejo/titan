'use client';
import ReviewNavbar from "@/components/molecules/review.navbar";
import Image from 'next/image';
import NoReviewsImage from '@/assets/images/Empty State.svg'
import {Button} from "@/components/atoms/ui/button";
import ReviewModal from "@/app/review/common/modal";
import React, {useState} from "react";
import useFetchReviewStore from "@/store/review.store";
import {Posts} from "@/app/review/common/posts";

export default function ReviewsPage() {
    const {reviews, locationSearched} = useFetchReviewStore();
    return (
        <div className='w-full h-full max-h-full'>
            <ReviewNavbar className='h-1/6' reviewsCount={reviews.length} queryLocation={locationSearched} reviews={reviews}/>
            <main className='bg-body h-5/6 flex-grow-1'>
                {
                    reviews.length == 0 ? (
                        <section className='mx-auto max-w-8xl px-8 sm:px-6 lg:px-24 flex flex-col justify-center items-center h-full max-h-full space-y-3'>
                            <Image
                                src={NoReviewsImage}
                                alt=''
                                className='lg:w-[350px]'
                            />
                            <div className='font-normal leading-3 text-title-xsm md:text-[16px] p-1 text-black2 text-center'>Oops! No reviews yet.</div>

                            <ReviewModal searchedId={locationSearched}>
                                <Button className='bg-primary text-white font-normal text-[10px] md:text-[16px] uppercase px-4 md:px-4 md:py-2 md:h-[50px] leading-5 rounded-md border-transparent'>Leave a review</Button>
                            </ReviewModal>
                        </section>
                    ) : (
                        <section className='mx-auto max-w-8xl px-8 sm:px-6 lg:px-24 flex flex-col md:flex-row items-start h-full max-h-full space-y-1 '>
                            <div className='text-title-xsm text-black2 md:w-8/12 flex flex-col justify-center items-center w-full'>
                                <div className=' lg:mr-24 lg:my-2 xl:mr-72 xl:my-4'>
                                    <Posts/>
                                </div>
                                <div className=' lg:mr-24 lg:my-2 xl:mr-72 xl:my-4'>
                                    <Posts/>
                                </div>
                                <div className=' lg:mr-24 lg:my-2 xl:mr-72 xl:my-4'>
                                    <Posts/>
                                </div>
                            </div>
                            <div className='text-title-xsm text-black2 w-4/12 hidden md:block'>
                                pic
                            </div>

                        </section>
                    )
                }
            </main>
        </div>
    );
}