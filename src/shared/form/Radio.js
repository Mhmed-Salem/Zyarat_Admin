import React from 'react';
import { Field } from 'formik';
import Radio from '@material-ui/core/Radio';


function RadioButton(props) {

    const { name, type, ...rest} = props;


    return (
        <div>
            <Field 
            id={name}
            name={name}
            type={type}
            as={Radio}
            {...rest}
        />
        

        </div>
    )

}

export default Radio;
