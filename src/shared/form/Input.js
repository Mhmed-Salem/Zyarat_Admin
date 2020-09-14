import React from 'react';
import { Field } from 'formik';
import TextField from '@material-ui/core/TextField';


function Input(props) {

    const { name, type, label, ...rest} = props;

    return (
        <div>
            <Field 
            id={name}
            name={name}
            type={type}
            as={TextField}
            label={label}
            {...rest}

        />
        
        </div>
    )

}

export default Input
