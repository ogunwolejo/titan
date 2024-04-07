'use client';
import React, {useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {Form, FormControl, FormField, FormLabel, FormMessage, FormItem, FormDescription} from '@/components/atoms/ui/form';
import {Input} from '@/components/atoms/ui/input';
import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import {z} from 'zod';
import {Card, CardContent, CardHeader} from "@/components/atoms/ui/cards";
import {Button} from '@/components/atoms/ui/button';
import {Separator} from "@/components/atoms/ui/seperator";
import GoogleIcon from '@/assets/social/google.svg';
import FacebookIcon from '@/assets/social/facebook.svg';
import AppleIcon from '@/assets/social/apple.svg'
import {EyeIcon, EyeSlashIcon} from "@heroicons/react/24/outline";
import {loginViaGoogleProvider, createUserAccountViaGoogleProvider, emailPasswordLoginHandler, createUserAccount} from "@/app/auth/auth.service";
import {FirebaseError} from "firebase/app";
import {useFireStore} from "@/hooks/useFirestore";
import {Collections} from "@/utils/enum";
import Spinner from "@/components/atoms/ui/spinner";
import {useRouter} from "next/navigation";

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


type FormProps = {
    mode: 'signup' | 'login';
}

export const AppForm: React.FC<FormProps> = ({mode}) => {
    const [securePass, setSecurePass] = useState<'show' | 'hide'>('hide');
    const [secureConfirm, setSecureConfirm] = useState<'show' | 'hide'>('hide');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {setDocument} = useFireStore(Collections.USER);
    const router = useRouter();
    const changePasswordInputHandle = (s: 'show' | 'hide') => {
        setSecurePass(s);
    }
    const changeConfirmPasswordInputHandle = (s: 'show' | 'hide') => {
        setSecureConfirm(s);
    }

    const form = useForm<z.infer<typeof  signupFormSchema>>({
        resolver: zodResolver(signupFormSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            lastName: '',
            firstName: '',
            confirmPassword: ''
        },
        mode: 'onSubmit'
    });

    function onSubmit(values: z.infer<typeof signupFormSchema>) {
        setIsLoading(false);
        // Login operations
        if (mode == 'login') {
            void emailPasswordLoginHandler({
                email: values.email!,
                password: values.password!,
            })
                .then((resp) => {
                    if (resp instanceof FirebaseError) {
                        // toast({
                        //     type: 'background',
                        //     open: true,
                        //     variant: 'destructive',
                        //     title: resp.message,
                        //     className: 'border-2 border-error text-error',
                        // });
                        console.error(resp);
                    }
                    // The auth observer will read the change in the user authentication credential - reference App.tsx useEffect
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }

        // Signup operations
        if (mode == 'signup') {
            void createUserAccount({
                lastName: values.lastName,
                email: values.email,
                firstName: values.firstName,
                username: values.username,
                password: values.password,
            })
                .then(async (resp) => {
                    if (resp instanceof FirebaseError) {
                        console.error(resp);
                    } else {
                        await setDocument(resp.uid, resp);
                    }
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }

    }
    const googleLoginHandler = () => {
        if (mode == 'login') {
            void loginViaGoogleProvider().then( (resp) => {
                if (resp instanceof FirebaseError) {
                    // toast({
                    //     type: 'background',
                    //     open: true,
                    //     variant: 'destructive',
                    //     title: resp.message,
                    //     className: 'border-2 border-error text-error',
                    // });
                    console.error(resp);
                }
            });
        }

        if (mode == 'signup') {
            void createUserAccountViaGoogleProvider().then(async (resp) => {
                if (resp instanceof FirebaseError) {
                    // toast({
                    //     type: 'background',
                    //     open: true,
                    //     variant: 'destructive',
                    //     title: resp.message,
                    //     className: 'border-2 border-error text-error',
                    // });
                    console.error(resp);
                } else {
                    await setDocument(resp.uid, resp);
                }
            });
        }

    }
    return (
        <>
            <Form {...form} >
                <Card className='bg-transparent md:bg-white min-w-[440px] mx-1 sm:mx-2 md:w-auto px-3 py-6 border-transparent rounded-sm'>
                    <CardContent className='bg-transparent'>
                        <CardHeader
                            className='text-center bg-transparent text-title-lg tracking-wide font-normal capitalize'>{mode === 'login' ? 'Login' : 'Sign up'}</CardHeader>
                        <form
                            className='w-full items-center flex flex-col space-y-5'
                            onSubmit={form.handleSubmit(onSubmit)}
                        >
                            {mode == 'signup' &&
                                <div className='w-full flex flex-col md:flex-row justify-between gap-4 md:gap-2'>
                                    <div className='w-full'>
                                        <FormField
                                            control={form.control}
                                            name='firstName'
                                            render={({field}) => (
                                                <FormItem className='w-full'>
                                                    <FormControl transparent htmlFor={field.name}>
                                                        <Input id={field.name} type='text'
                                                               placeholder='First Name' {...field} />
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
                                                    <FormControl transparent htmlFor={field.name}>
                                                        <Input id={field.name} type='text'
                                                               placeholder='Last Name' {...field} />
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
                                            <FormControl transparent htmlFor={field.name}>
                                                <Input id={field.name} type='email'
                                                       placeholder='E-mail address' {...field} />
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
                                                <div className='max-w-xl w-full'>
                                                    <div className='relative'>
                                                        <Input id={field.name}
                                                               type={securePass === 'show' ? 'text' : 'password'}
                                                               placeholder='Password' {...field} />
                                                        <div
                                                            className='cursor-pointer absolute inset-y-0 right-0 flex items-center pr-3 border-2 border-input bg-currentColor px-5 py-6 rounded-md border-l-0'>
                                                            {
                                                                securePass === 'hide' ?
                                                                    <EyeIcon
                                                                        className='h-4 w-4 text-form-stroke'
                                                                        aria-hidden='true'
                                                                        onClick={() => changePasswordInputHandle('show')}
                                                                    /> : <EyeSlashIcon
                                                                        className='h-4 w-4 text-form-stroke'
                                                                        aria-hidden='true'
                                                                        onClick={() => changePasswordInputHandle('hide')}
                                                                    />
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
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
                                                <div className='max-w-xl w-full'>
                                                    <div className='relative'>
                                                        <Input id={field.name}
                                                               type={secureConfirm === 'hide' ? 'password' : 'text'}
                                                               placeholder='Confirm Password' {...field} />
                                                        <div
                                                            className='absolute inset-y-0 right-0 flex items-center pr-3 border-2 border-input bg-currentColor px-5 py-6 rounded-md border-l-0'>
                                                            {
                                                                secureConfirm === 'hide' ?
                                                                    <EyeIcon
                                                                        className='h-4 w-4 text-form-stroke cursor-pointer'
                                                                        aria-hidden='true'
                                                                        onClick={() => changeConfirmPasswordInputHandle('show')}
                                                                    /> :
                                                                    <EyeSlashIcon
                                                                        className='h-4 w-4 text-form-stroke'
                                                                        aria-hidden='true'
                                                                        onClick={() => changeConfirmPasswordInputHandle('hide')}
                                                                    />
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>}


                            <div className='w-full flex flex-col items-center space-y-2.5'>
                                {isLoading ? (
                                        <div className='flex justify-center item-center'>
                                            <Spinner className='border-primary h-4 w-4'/>
                                        </div>
                                    ) :
                                    <Button type='submit' variant='default' size='lg'
                                            className='w-full uppercase text-white font-normal'>
                                        {mode === 'signup' ? 'sign up' : 'login'}
                                    </Button>
                                }
                                <div className='flex justify-evenly items-center space-x-3'>
                                    <Separator className='bg-[#3366FF59] w-24 opacity-35' orientation='horizontal'/>
                                    <span className='capitalize text-[10px] font-[400]'>or</span>
                                    <Separator className='bg-[#3366FF59] w-24 opacity-35' orientation='horizontal'/>
                                </div>
                                <Button className='border-2 w-full border-[#D8DAE5] gap-2' variant='secondary'
                                        size='icon' onClick={googleLoginHandler} type='button'>
                                    <Image src={GoogleIcon} alt='google icon'/>
                                    <p>Sign Up with Google </p>
                                </Button>
                                <Button className='border-2 w-full gap-2 border-[#D8DAE5]' variant='secondary'
                                        type='button'>
                                    <Image src={FacebookIcon} alt='facebook icon'/>
                                    <p>Sign Up with Facebook </p>
                                </Button>
                                <Button className='relative border-2 gap-2 w-full border-[#D8DAE5]' variant='secondary'
                                        type='button'>
                                    <Image src={AppleIcon} alt='apple icon'/>
                                    <p>Sign Up with apple </p>
                                </Button>
                            </div>
                        </form>
                        <p className='text-black text-xs font-semibold text-center'>
                            Already have an account? <Button type='button' variant='link' onClick={() => router.push(mode == 'signup' ? '/auth/login' : '/auth/signup')} className='text-primary-light capitalize mx-0 px-0'>{mode == 'signup' ? 'Log In' : 'Sign up'}</Button>
                        </p>
                    </CardContent>
                </Card>
            </Form>
        </>
    )
}