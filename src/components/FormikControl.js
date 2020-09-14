import React from 'react'
import Input from './Input';

const FormikControl = (props) => {

    const { control } = props;

    switch (control) {
        case 'input': return <Input {...rest} />

            break;

        default: return null
            break;
    }
    return (
        <div>

        </div>
    )
}

export default FormikControl;

//the functionality of this component is to decide which of the form field have to be rendered.
//based on one particular prop, let's call that prop as control
