import { InputChoicesProps } from '@/types/types';
import { ErrorMessage, Field } from 'formik';
import React from 'react'

function SelectInput(props:InputChoicesProps) {
  const { name, label, options, ...rest } = props;

  return (
    <div className=' flex flex-col items-start gap-1'>
      <label
        htmlFor={name}
        className=' text-secound font-light ml-4'
      >{label}</label>
      <Field
        as='select'
        id={name}
        name={name}
        className='bg-[#f1f0f5] h-10 rounded-xl w-full outline-none p-2 '
        {...rest}>
        {options.map((option: { value: number, label: string }) => (
          <option
            className=' hover:bg-primary-200'
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </Field>
      <ErrorMessage name={name} />
    </div>
  )
}

export default SelectInput