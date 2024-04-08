'use client';
import ReviewNavbar from "@/components/molecules/review.navbar";
import Image from 'next/image';
import NoReviewsImage from '@/assets/images/Empty State.svg'
import {Button} from "@/components/atoms/ui/button";
import ReviewModal from "@/app/review/common/modal";
import React, {useState, useMemo, useCallback} from "react";
import useFetchReviewStore from "@/store/review.store";
import {Posts} from "@/app/review/common/posts";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis
} from '@/components/atoms/ui/pagination';

export default function ReviewsPage() {
    const {reviews, locationSearched} = useFetchReviewStore();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = useMemo(() => 3, []);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const totalPages = Math.ceil(reviews.length / itemsPerPage);
    const currentItems = reviews.slice(indexOfFirstItem, indexOfLastItem);

    // Handle pagination
    const paginate = useCallback((pageNumber: number) => {
        if (pageNumber > currentPage || pageNumber < totalPages) {
            setCurrentPage(pageNumber)
        }
    }, []);
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
                        <section>
                            <section
                                className='mx-auto max-w-8xl px-8 sm:px-6 lg:px-24 flex flex-col md:flex-row items-start h-full max-h-full space-y-1 '>
                                <div className='text-title-xsm text-black2 md:w-8/12 flex flex-col justify-center items-center w-full'>
                                    {currentItems.map((el, idx: number) => (
                                        <Posts reviews={el} key={idx}/>
                                    ))}
                                </div>
                                <div className='text-title-xsm text-black2 w-4/12 hidden md:block'>
                                    {/***pic****/}
                                </div>
                            </section>
                            <div className='md:w-8/12 w-full px-8 sm:px-6 lg:px-24 text-black2'>
                                <Pagination className='cursor-pointer'>
                                    <PaginationContent>
                                        <PaginationPrevious onClick={paginate.bind(null, currentPage - 1)} />
                                        <PaginationItem>
                                            <PaginationLink onClick={paginate.bind(null, 1)}>1</PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink onClick={paginate.bind(null, 2)}>2</PaginationLink>
                                        </PaginationItem>
                                        <PaginationEllipsis />
                                        <PaginationItem>
                                            <PaginationLink onClick={paginate.bind(null, totalPages)}>Last</PaginationLink>
                                        </PaginationItem>
                                        <PaginationNext onClick={paginate.bind(null, currentPage + 1)}/>
                                    </PaginationContent>
                                </Pagination>
                            </div>
                        </section>
                    )
                }
            </main>
        </div>
    );
}