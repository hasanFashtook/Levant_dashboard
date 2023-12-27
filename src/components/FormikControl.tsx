import React from 'react'
import Input from './Input'
import SelectInput from './SelectInput';
import RadioInput from './RadioInput';
import { InputControlProps } from '@/types/types';

function FormikControl(props: InputControlProps) {
  const { control, ...rest } = props;
  switch (control) {
    case 'input': return <Input {...rest} />
    case 'select': return <SelectInput {...rest} />
    case 'radio': return <RadioInput {...rest} />
  }
}

export default FormikControl