import { InputChoicesProps } from '@/types/types';
import { ErrorMessage, Field, FieldProps } from 'formik';
import React from 'react'

function RadioInput(props: InputChoicesProps) {
  const { name, label, options, ...rest } = props;

  return (
    <div className=' flex flex-col items-start gap-1'>
      <label
        className=' text-secound font-light ml-4'
      >{label}</label>
      <div className="flex justify-around w-full">
        <Field
          name={name}
          {...rest}
        >
          {
            ({ field }: {
              field: {
                name: string,
                value: string,
              }
            }) => {
              return options.map((option, i) => {
                return <div key={i} className=' flex items-center gap-1'>
                  <input
                    {...field}
                    type='radio'
                    id={`${option.value == 1 ? true : false}`}
                    value={option.value}
                    checked={field.value == `${option.value}`}
                  />
                  <label className=' text-secound' htmlFor={`${option.value == 1 ? true : false}`}>{option.label}</label>
                </div>
              })
            }
          }
        </Field>
      </div>
      <ErrorMessage name={name} />
    </div>
  )
}

export default RadioInput