import ReviewNavbar from "@/components/molecules/review.navbar";
import Image from 'next/image';
import NoReviewsImage from '@/assets/images/Empty State.svg'
import {Button} from "@/components/atoms/ui/button";
import ReviewModal from "@/app/review/common/modal";
import React from "react";

export default function ReviewsPage() {
    return (
        <div className='w-full h-full max-h-full'>
            <ReviewNavbar className='h-1/6'/>
            <main className='bg-body h-5/6 flex-grow-1'>
                <section className='mx-auto max-w-8xl px-8 sm:px-6 lg:px-24 flex flex-col justify-center items-center h-full max-h-full space-y-3'>
                    <Image
                        src={NoReviewsImage}
                        alt=''
                        className='lg:w-[350px]'
                    />
                    <div className='font-normal leading-3 text-title-xsm md:text-[16px] p-1 text-black2 text-center'>Oops! No reviews yet.</div>

                    <ReviewModal>
                        <Button className='bg-primary text-white font-normal text-[10px] md:text-[16px] uppercase px-4 md:px-4 md:py-2 md:h-[50px] leading-5 rounded-md border-transparent'>Leave a review</Button>
                    </ReviewModal>
                </section>
            </main>
        </div>
    );
}