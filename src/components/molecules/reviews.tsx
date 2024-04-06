'use client'

import {Card, CardContent, CardHeader, CardDescription, CardFooter, CardTitle} from '@/components/atoms/ui/cards'
import {Avatar, AvatarImage} from "@/components/atoms/ui/avatar";
import Star from 'react-star-rating-component';
import {Badge} from '@/components/atoms/ui/badge';

export default function Reviews() {
    return (
        <Card className='w-full rounded-xl bg-white shadow-lg drop-shadow-sm border-transparent'>
            <CardContent>
                <CardHeader className='flex flex-row pl-1 justify-between items-center text-body-header1'>
                    <div className='flex flex-row gap-1'>
                        <Avatar className='w-6 h-6' >
                            <AvatarImage src='https://github.com/shadcn.png'/>
                        </Avatar>
                        <div className='text-body-header1'>
                            <div className='text-xs font-semibold truncate ... w-[80px]'>James <span className=''>Tanwesssssss</span></div>
                            <p className='font-light text-body-header1 text-[8px]'>5 months</p>
                        </div>
                    </div>

                    <div className='flex flex-col'>
                        <div className='font-semibold text-xs capitalize'>Ikeja, lagos</div>
                        <div>
                            <Star name='' value={3} starCount={5} editing={false}/>
                        </div>
                    </div>
                </CardHeader>
                <CardDescription className='text-xs'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, dolore, nobis? Ducimus ex explicabo nihil sapiente. Ab accusamus, aliquid cupiditate exercitationem expedita hic molestias officiis possimus repudiandae sunt suscipit velit?
                </CardDescription>
            </CardContent>
            <CardFooter className='flex flex-row-reverse justify-between items-center mt-2 border-0 border-transparent'>
                <Badge className='text-[8px] text-white' variant='default'>power</Badge>
                <div className='flex flex-row space-x-2'>
                    <div className='flex fle-row justify-center items-center gap-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"
                             stroke-width="1.5"
                             stroke="currentColor" className="w-4 h-4 text-input">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"/>
                        </svg>
                        <p className='text-[8px] text-input'>24</p>
                    </div>
                    <div className='flex fle-row justify-center items-center gap-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"
                             stroke-width="1.5"
                             stroke="currentColor" className="w-4 h-4 text-input">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54"/>
                        </svg>
                        <p className='text-[8px] text-input'>24</p>
                    </div>
                    <div className='flex fle-row justify-center items-center gap-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"
                             stroke-width="1.5"
                             stroke="currentColor" className="w-4 h-4 text-input">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"/>
                        </svg>
                        <p className='text-[8px] text-input'>24</p>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}