import {Input} from "@/components/atoms/ui/input";
import {MagnifyingGlassIcon} from '@heroicons/react/24/outline';
import {Button} from "@/components/atoms/ui/button";
import {ScrollArea, ScrollBar} from "@/components/atoms/ui/scrollable";
import Reviews from "@/components/molecules/reviews";

export default function Home() {
  const array = [1, 2, 3, 4,5, 6, 61, 99/*6,7,8, 9, 10*/];
  return (
      <main className="w-full h-full min-h-full max-h-full">
          <div className='h-full flex flex-col md:flex-row items-start justify-center gap-1 py-1'>
              {/**** left hand side ***/}
              <section className='space-y-3 w-full md:w-3/5 px-3 py-5 flex flex-col justify-center h-full'>
                  <div className='w-full text-center md:text-start xl:w-[504px] space-y-3 text-header1'>
                      <h3 className='text-md md:text-title-lg lg:text-title-xxl font-extrabold  tracking-wide text-wrap'>
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
                          <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                              <MagnifyingGlassIcon className='h-4 w-4 text-form-stroke' aria-hidden='true'/>
                          </div>
                          <Input
                              id='search'
                              name='search'
                              className='w-full pl-10 pr-3'
                              placeholder='Enter Address'
                              type='search'

                          />
                      </div>
                  </div>

                  <div className='hidden md:block'>
                      <Button variant='default' size='lg' className='bg-primary text-white font-[500] uppercase title-xsm'>Search</Button>
                  </div>

              </section>

              {/**** Right hand side ***/}
              <section className='h-full w-full md:w-2/5 px-2 border-transparent'>
                  <ScrollArea className='h-4/5' scrollHideDelay={5}>
                      <div className='grid grid-cols-2 gap-x-6 gap-y-2 '>
                          {
                              array.map((el:number) => (
                                  <div className='w-auto' key={el}>
                                      <Reviews/>
                                  </div>
                              ))
                          }
                      </div>
                      <ScrollBar orientation='vertical' />
                  </ScrollArea>
              </section>

          </div>
      </main>
  );
}
