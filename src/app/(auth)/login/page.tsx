'use client'
import { NextPage } from 'next'
import * as yup from 'yup';
import 'rsuite/dist/rsuite-no-reset.min.css';
import { Form, Formik } from 'formik';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { signIn } from "next-auth/react";
import FormikControl from '@/components/FormikControl';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Toaster, toast } from 'sonner';

interface Props {
}

interface Values {
  username: string,
  password: string
}

const validationSchema = yup.object({
  username: yup
    .string()
    .min(3, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required'),
  password: yup
    .string()
    .min(8, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required'),
});

const initialValues = {
  username: '',
  password: ''
}
const Page: NextPage<Props> = ({ }) => {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const [toastShown, setToastShown] = useState(false);
  const onSubmit = async (values: Values) => {
    try {
      setLoading(true);
      await signIn("credentials", {
        username: values.username,
        password: values.password,
        redirect: true,
        callbackUrl: '/'
      })
      setLoading(false);
    } catch (err) {
      console.log(err)
    }
  }

  const msgErr = searchParams?.get('error');
  useEffect(() => {
    if (!toastShown) {
      setToastShown(true);
    } else {
      msgErr == 'fetch failed'
        ? toast.error('network error')
        : msgErr == 'CredentialsSignin'
          ? toast.error('your email or password is incorrect')
          : toast.error('try again');
    }
  }, [msgErr, toastShown])

  return (
    <div className=' min-h-screen relative bg-levant-gradient-120 w-full flex flex-col justify-center items-center'>
      <Image
        className=' absolute -top-9 w-28 h-28 left-3 z-10'
        src="/Group_209.svg"
        width={20}
        height={20}
        alt="" />
      <Image
        className=' absolute top-60 w-28 h-28 left-56 z-10'
        src="/Group_212.svg"
        width={20}
        height={20}
        alt="" />
      <Image
        className=' absolute top-96 w-28 h-28 left-1/4 z-10'
        src="/Group_212.svg"
        width={20}
        height={20}
        alt="" />
      <Image
        className=' absolute top-4/5 w-28 h-28 right-1/4 z-10'
        src="/Group_212.svg"
        width={20}
        height={20}
        alt="" />
      <Image
        className=' absolute h-screen right-0 w-1/2 z-10'
        src="/Layer_2.svg"
        width={20}
        height={20}
        alt="" />

      <Toaster duration={5000} expand={true} position="top-right" richColors />
      <div className=' absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex shadow-shadow-r-b flex-col items-center gap-4 w-[25rem] mx-auto bg-white rounded-3xl p-8'>
        <h1 className=' font-bold text-3xl capitalize text-primary mb-6'>log in</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {formik => (
            <Form
              onSubmit={formik.handleSubmit}
              className='w-full flex flex-col gap-4'
            >
              <FormikControl
                control='input'
                name='username'
                label='Username'
                type='text'
              />
              <FormikControl
                control='input'
                name='password'
                label='Password'
                type='password'
              />
              <button
                type='submit'
                className=' bg-levant-gradient-r relative w-fit mx-auto text-[#fff] text-sm px-10 py-2 rounded-full'
              >
                <span>
                  Log In
                </span>
                {loading &&
                  <div className="lds-dual-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                }
              </button>
            </Form>
          )}
        </Formik>
        <p
          className=' capitalize text-secound text-sm mb-20 '
        >
          don&#39;t have an account?
          <Link
            className=' text-[#0190FF] font-semibold'
            href={'/register'}> Register
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Page