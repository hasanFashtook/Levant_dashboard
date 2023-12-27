import { ErrorMessage, Field } from 'formik';
import React from 'react'
import TextError from './TextError';
import { InputProps } from '@/types/types';

function Input(props: InputProps) {
  const { label, name, type, ...rest } = props;

  return (
    <div className='form-control flex items-start gap-[0.125rem] flex-col'>
      <label
        htmlFor={name}
        className=' text-secound font-light ml-4'
      >{label}</label>
      <Field
        {...rest}
        id={name}
        type={type}
        name={name}
        className=' bg-[#f1f0f5] w-full h-10 rounded-xl outline-none py-2 px-4 '
      />
      <ErrorMessage name={name} component={TextError} />
    </div>
  )
}

export default Input