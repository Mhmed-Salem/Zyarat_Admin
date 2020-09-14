import React, { useState } from 'react';
import {TextField, Grid, MenuItem, Typography, Button } from '@material-ui/core';
import axios from 'axios';
import FormikControl from '../shared/form/FormikControl';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { toast } from 'react-toastify';






function ModifyDoctor({doctor, speciality, doctorCities, hide}) {



   

        const initialValues = {
            FName: doctor.fName ? `${doctor.fName}` : '',
            LName: doctor.lName ? `${doctor.lName}` : '',
            SpecialityId: doctor.medicalSpecialized ? `${doctor.medicalSpecialized.type}` : '',
            CityId: ''
          };
    
    
      const validationSchema = Yup.object({
        FName: Yup.string().min(5, 'must be 10 characters at least').required("Required."),
        LName: Yup.string().min(5, 'must be 10 characters at least').required("Required.")
      });
    
      const onSubmit = async (values) => {
          console.log(values)
        try {
           await axios.put(`/api/doctor/${doctor.id}`, values );
           toast.success("modified successfully!")
        } catch (error) {
           toast.error("failed to delete") 
          console.log(error)
        }
      }

    return (
        <div>
            <Typography display='inline' color='primary' >  Modify doctor { doctor.fName + " "  + doctor.lName}  </Typography>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                enableReinitialize  >
                {
                    formik => (
                        <Form>
                            <Grid direction='row' container spacing={2}>
                                <Grid item xs={6}>
                                    <FormikControl   
                                        label="First name" type='text' control='input' name='FName'
                                        id='FName' fullWidth variant="outlined"
                                        error={Boolean(formik.errors.FName && formik.touched.FName)}
                                        helperText={formik.errors.FName &&
                                            formik.touched.FName &&
                                            String(formik.errors.FName)} />
                                </Grid>
                                            
                                <Grid item xs={6}>
                                    <FormikControl  
                                        label="Last name" type='text' control='input' name='LName'
                                        id='LName' fullWidth variant="outlined"
                                        error={Boolean(formik.errors.LName && formik.touched.LName)}
                                        helperText={formik.errors.LName &&
                                            formik.touched.LName &&
                                            String(formik.errors.LName)} />
                                </Grid>

                                <Grid item xs={6}>
                                    <Field
                                        as={TextField}
                                        fullWidth
                                        type="text"
                                        name="SpecialityId"
                                        label="Choose the the speciality"
                                        select
                                        variant="outlined"
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    >
                                        {speciality.map(option => (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.type}
                                            </MenuItem>
                                        ))}
                                    </Field>
                                </Grid>

                                <Grid item xs={6}>
                                    <Field
                                        as={TextField}
                                        fullWidth
                                        type="text"
                                        name="CityId"
                                        label="Choose the the city"
                                        select
                                        variant="outlined"
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    >
                                        {doctorCities.map(option => (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.cityName}
                                            </MenuItem>
                                        ))}
                                    </Field>
                                </Grid>


                                <Grid item>
                                    <Button variant="contained"  type='submit' 
                                    color="secondary" onClick={hide}>Submit</Button>
                                </Grid>
                            </Grid>
                        </Form>
                    )
                }

            </Formik>
           
                    </div>
    )
}

export default ModifyDoctor;


    