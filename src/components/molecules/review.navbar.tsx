'use client'
import React from "react";
import Link from 'next/link';
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

const clash = localFont({
    src: '../../fonts/clashdisplaybold.otf',
    weight: '700',
    display: 'swap',
    variable: '--font-clash-display'
})

export default function ReviewNavbar({className}: {className?: string}) {
    return (
        <div className={cn('mx-auto max-w-8xl px-8 sm:px-6 lg:px-24 pt-2 pb-3', className)}>
            <div className='flex justify-between items-center'>
                <div className={`${clash.variable} flex items-end space-x-1.5`}>
                    <Link href='/homepage' className='tracking-wider text-black uppercase font-extrabold text-[10px] bg-transparent'>Spotta</Link>
                    <span
                        className='bg-primary-light text-white border-1 py-.5 px-1.5 uppercase text-[7px] font-semibold '>NG</span>
                </div>
                <div className='max-w-xl w-full'>
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

                        />
                        <div
                            className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 border-2 border-input bg-[#FBFAFC rounded-md border-l-0'>
                            <XMarkIcon className='h-4 w-4 text-[#0D2159]'  aria-hidden='true'/>
                        </div>
                    </div>
                </div>
                <Link href='/auth/login' className='text-primary-light2 text-md font-semibold'>
                    Login
                </Link>
            </div>

            <div className='flex flex-col md:flex-row justify-between pt-2 pb-2'>
                <div>
                    <h3 className='text-black2 font-bold capitalize text-[24px] tracking-widest'>
                        Bonny and Clyde Street, Ajao Estate, Lagos
                    </h3>
                    <h6 className='font-semibold text-title-xsm text-[#18181B]'>
                        “0” Reviews
                    </h6>
                </div>

                <div className='flex justify-start gap-1.5 items-end'>
                    <ReviewModal>
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
                </div>
            </div>
            <div className=''>
                <Carousel
                    opts={{
                        align: 'start'
                    }}
                    orientation='horizontal'
                    className='w-full'
                >
                    <CarouselContent className=''>
                        {
                            Array.from({ length: 24}).map((_, idx: number) => (
                                <CarouselItem className="base-1/12 md:basis-1/12" key={idx}>
                                    <NavCard s={`${idx}a`}/>
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