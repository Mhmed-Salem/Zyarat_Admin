import React from 'react'
import Input from './Input';
import RadioButton from './Radio';
import SelectList from './Select';

const FormikControl = (props) => {

    const { control, ...rest } = props;

    switch (control) {
        case 'input': return <Input {...rest} />

        case 'radio': return <RadioButton {...rest} />

        case 'select': return <SelectList {...rest} />

        default: return null
    }
    
}

export default FormikControl;

//the functionality of this component is to decide which of the form field have to be rendered.
//based on one particular prop, let's call that prop as control
