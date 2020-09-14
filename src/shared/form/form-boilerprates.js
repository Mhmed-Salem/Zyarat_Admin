import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import FormikControl from '../shared/form/FormikControl';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import {
    Grid, Paper, TextField, Box, Button, FormControl, FormLabel,
    FormControlLabel, RadioGroup, Radio
  } from '@material-ui/core'

const Component = () => {

    const initialValues = {

    };

    const validationSchema = Yup.object({

    });

    const onSubmit = (values) => console.log('form data is here...', values)
    return (<Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit} >
        {
            formik => (
                <div>here...</div>
            )
        }
    </Formik>);
}

export default Component;