'use client';
import { useRouter } from 'next/navigation'
import {Input} from "@/components/atoms/ui/input";
import {MagnifyingGlassIcon} from '@heroicons/react/24/outline';
import {Button} from "@/components/atoms/ui/button";
import {ScrollArea, ScrollBar} from "@/components/atoms/ui/scrollable";
import Reviews from "@/components/molecules/reviews";
import useAuthStore from "@/store/auth";
import {useLocationQuery} from "@/hooks/useLocationQuery";
import {ChangeEvent} from "react";
import Spinner from "@/components/atoms/ui/spinner";

export default function Home() {
  const array = [1, 2, 3, 4,5, 6, 61, 99/*6,7,8, 9, 10*/];
  const router = useRouter();
  const {user} = useAuthStore();
  const {reviews, queryState, location, setLocation, fetchReviewsHandle} = useLocationQuery();

  return (
      <main className="w-full max-h-max">
          <div className='max-h-full h-full min-h-full flex flex-col md:flex-row items-start justify-center gap-x-1'>
              {/**** left hand side ***/}
              <section className='space-y-3 w-full md:w-3/5 lg:w-4/12 xl:w-3/5 px-3 py-3 box-border flex flex-col justify-center h-full'>
                  <div className='w-full text-center md:text-start  xl:w-[504px] space-y-2 text-header1'>
                      <h3 className='text-md md:text-title-lg lg:text-title-xl xl:text-title-xxl font-extrabold  tracking-wide text-wrap'>
                          Find a place you will love to live!
                      </h3>
                      <p className='title-sm font-normal'>
                          See through the lenses of people who have
                          lived or visited the neighbourhood you might
                          have in mind.
                      </p>
                  </div>


                  <div className='max-w-xl w-full'>
                      <div className='relative'>
                          <div
                              className='hidden md:flex absolute inset-y-0 left-0  items-center pl-3 border-2 border-input bg-[#F3F7FE] rounded-md border-r-0'>
                              <MagnifyingGlassIcon className='h-4 w-4 text-form-stroke' aria-hidden='true'/>
                          </div>
                          <Input
                              id='search'
                              name='search'
                              className='w-full pl-10 pr-3'
                              placeholder='Enter Address'
                              type='search'
                              value={location}
                              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                  setLocation(e.target.value);
                              }}
                              // onKeyDown={async () => {
                              //     await fetchReviewsHandle();
                              // }}
                          />
                          <div className='md:hidden absolute inset-y-0 right-0 flex items-center pr-3 border-2 border-input bg-[#F3F7FE] rounded-md border-l-0'>
                              {
                                  queryState != 'fetching' ? <MagnifyingGlassIcon className='h-6 w-6 text-form-stroke' aria-hidden='true'/> : <Spinner className='border-primary h-6 w-6'/>
                              }
                          </div>
                      </div>
                  </div>

                  <div className='hidden md:block'>
                      {
                          queryState != 'fetching' ? (
                              <Button
                                  variant='default'
                                  size='lg'
                                  className='bg-primary text-white font-[500] uppercase title-xsm'
                                  onClick={async () => {
                                      await fetchReviewsHandle();
                                  }}
                             >
                                Search
                             </Button>
                         ) : (
                             <Spinner className='border-primary h-6 w-6'/>
                         )
                      }
                  </div>

              </section>

              {/**** Right hand side ***/}
              <section className='max-h-min h-full w-full md:w-2/5 lg:w-8/12 xl:w-2/5 px-2 border-transparent'>
                  <ScrollArea className='h-4/5' scrollHideDelay={5} >
                      <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-2 xl:gap-x-6 gap-y-2'>
                          {
                              array.map((el:number) => (
                                  <div className='w-auto' key={el}>
                                      <Reviews/>
                                  </div>
                              ))
                          }
                      </div>
                      <ScrollBar orientation='vertical' hidden={true}/>
                  </ScrollArea>
              </section>

          </div>
      </main>
  );
}
