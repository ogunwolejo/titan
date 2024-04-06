'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {Form, FormControl, FormField, FormLabel, FormMessage, FormItem, FormDescription} from '@/components/atoms/ui/form';
import {Input} from '@/components/atoms/ui/input';
import {useForm, UseFormReturn} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import {z, ZodObject} from 'zod';
import {Card, CardContent, CardHeader} from "@/components/atoms/ui/cards";
import {Button} from '@/components/atoms/ui/button';
import {Separator} from "@/components/atoms/ui/seperator";
import GoogleIcon from '@/assets/social/google.svg';
import FacebookIcon from '@/assets/social/facebook.svg';
import AppleIcon from '@/assets/social/apple.svg'
import {Dialog, DialogContent, DialogDescription,  DialogHeader, DialogTitle} from "@/components/atoms/ui/dialog";

const loginFormSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.string().email({
        message: 'user email needed'
    }),
    password: z.string(),
})

const signupFormSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    firstName: z.string().min(1,{
        message: 'first name is required',
    }),
    lastName: z.string().min(1, {
        message: 'last name is required',
    }),
    email: z.string().email({
        message: 'user email needed'
    }),
    password: z.string(),
    confirmPassword: z.string(),
})


type FormProps<T> = {
    mode: 'signup' | 'login';
}

export const AppForm: React.FC<FormProps<any>> = ({mode}) => {
    const form = useForm<z.infer<typeof loginFormSchema | typeof  signupFormSchema>>({
        resolver: mode == 'signup' ? zodResolver(signupFormSchema) : zodResolver(loginFormSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            lastName: '',
            firstName: '',
            confirmPassword: ''
        },
    });

    async function onSubmit(values: z.infer<typeof loginFormSchema | typeof  signupFormSchema>) {
        console.log('@@', values);
    }
    const googleLoginHandler = async () => {
        return <Dialog>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    }
    return (
        <>
            <Form {...form} key=''>
                <Card className='bg-transparent md:bg-white min-w-[440px] mx-1 sm:mx-2 md:w-auto px-3 py-6 border-transparent rounded-sm'>
                    <CardContent className='bg-transparent'>
                        <CardHeader className='text-center bg-transparent text-title-lg tracking-wide font-normal capitalize'>{mode === 'login' ?  'Login' : 'Sign up'}</CardHeader>
                        <form
                            className='w-full items-center flex flex-col space-y-5'
                            onSubmit={form.handleSubmit(onSubmit)}
                        >
                            {mode == 'signup' && <div className='w-full flex flex-col md:flex-row justify-between gap-4 md:gap-2'>
                                <div className='w-full'>
                                    <FormField
                                        control={form.control}
                                        name='firstName'
                                        render={({field}) => (
                                            <FormItem className='w-full'>
                                                <FormControl transparent htmlFor={field.name}>
                                                    <Input id={field.name} type='text' placeholder='First Name' {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className='w-full'>
                                    <FormField
                                        control={form.control}
                                        name='lastName'
                                        render={({field}) => (
                                            <FormItem className='w-full'>
                                                <FormControl  transparent htmlFor={field.name}>
                                                    <Input id={field.name} type='text' placeholder='Last Name' {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>}

                            {mode == 'signup' && <div className='w-full'>
                                <FormField
                                    control={form.control}
                                    name='username'
                                    render={({field}) => (
                                        <FormItem className='w-full'>
                                            <FormControl label='Work email' transparent htmlFor={field.name}>
                                                <Input id={field.name} type='text' placeholder='Username' {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>}

                            <div className='w-full'>
                                <FormField
                                    control={form.control}
                                    name='email'
                                    render={({field}) => (
                                        <FormItem className='w-full'>
                                            <FormControl  transparent htmlFor={field.name}>
                                                <Input id={field.name} type='email' placeholder='E-mail address' {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className='w-full'>
                                <FormField
                                    control={form.control}
                                    name='password'
                                    render={({field}) => (
                                        <FormItem className='w-full'>
                                            <FormControl transparent htmlFor={field.name}>
                                                <Input id={field.name} type='password' placeholder='Password' {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {mode == 'signup' && <div className='w-full'>
                                <FormField
                                    control={form.control}
                                    name='confirmPassword'
                                    render={({field}) => (
                                        <FormItem className='w-full'>
                                            <FormControl transparent htmlFor={field.name}>
                                                <Input id={field.name} type='password' placeholder='Confirm Password' {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div> }


                            <div className='w-full flex flex-col items-center space-y-2.5'>
                                <Button type='submit' variant='default' size='lg' className='w-full uppercase text-white font-normal'>{mode === 'signup' ? 'sign up' : 'login'}</Button>
                                <div className='flex justify-evenly items-center space-x-3'>
                                    <Separator className='bg-[#3366FF59] w-24 opacity-35' orientation='horizontal' />
                                    <span className='capitalize text-[10px] font-[400]'>or</span>
                                    <Separator className='bg-[#3366FF59] w-24 opacity-35' orientation='horizontal' />
                                </div>
                                <Button className='border-2 w-full border-[#D8DAE5] gap-2' variant='secondary' size='icon' onClick={googleLoginHandler} type='button'>
                                    <Image src={GoogleIcon} alt='google icon' />
                                    <p>Sign Up with Google </p>
                                </Button>
                                <Button className='border-2 w-full gap-2 border-[#D8DAE5]' variant='secondary' type='button'>
                                    <Image src={FacebookIcon} alt='facebook icon' />
                                    <p>Sign Up with Facebook </p>
                                </Button>
                                <Button className='relative border-2 gap-2 w-full border-[#D8DAE5]' variant='secondary' type='button'>
                                    <Image src={AppleIcon} alt='apple icon' />
                                    <p>Sign Up with apple </p>
                                </Button>

                                <p className='text-black text-xs font-semibold'>
                                    Already have an account? <Link href={mode == 'signup' ? '/auth/login' : '/auth/signup'} className='text-primary-light capitalize'>{mode == 'signup' ? 'Log In' : 'Sign up'}</Link>
                                </p>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </Form>
        </>
    )
}